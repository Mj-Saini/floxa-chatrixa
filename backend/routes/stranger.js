import express from 'express';
import { StrangerChat, StrangerQueue, User, Notification } from '../models/index.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Join stranger chat queue
router.post('/join', auth, async (req, res) => {
  try {
    const { language = 'en', ageRange = { min: 18, max: 99 }, gender = 'any', interests = [] } = req.body;

    // Check if user is already in queue
    const existingQueue = await StrangerQueue.findOne({ user: req.user._id });
    if (existingQueue) {
      return res.status(400).json({ message: 'You are already in the queue' });
    }

    // Check if user is already in an active stranger chat
    const activeChat = await StrangerChat.findOne({
      'participants.user': req.user._id,
      status: { $in: ['waiting', 'active'] }
    });

    if (activeChat) {
      return res.status(400).json({ message: 'You are already in a stranger chat' });
    }

    // Add user to queue
    const queueEntry = new StrangerQueue({
      user: req.user._id,
      preferences: {
        language,
        ageRange,
        gender,
        interests
      }
    });

    await queueEntry.save();

    // Try to find a match
    const match = await findMatch(req.user._id, queueEntry.preferences);
    
    if (match) {
      // Create stranger chat
      const strangerChat = new StrangerChat({
        participants: [
          { user: req.user._id },
          { user: match.user }
        ],
        status: 'active',
        startedAt: new Date(),
        preferences: {
          language: queueEntry.preferences.language,
          ageRange: queueEntry.preferences.ageRange,
          gender: queueEntry.preferences.gender,
          interests: queueEntry.preferences.interests
        }
      });

      await strangerChat.save();

      // Update both users' queue status
      await StrangerQueue.updateMany(
        { user: { $in: [req.user._id, match.user] } },
        { status: 'matched', matchedAt: new Date() }
      );

      // Populate user details
      await strangerChat.populate('participants.user', 'username firstName lastName avatar');

      res.json({
        message: 'Match found!',
        chat: strangerChat,
        matchFound: true
      });
    } else {
      res.json({
        message: 'Added to queue. Waiting for match...',
        matchFound: false,
        queuePosition: await getQueuePosition(req.user._id)
      });
    }
  } catch (error) {
    console.error('Join stranger chat error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Leave stranger chat queue
router.post('/leave', auth, async (req, res) => {
  try {
    // Remove from queue
    await StrangerQueue.findOneAndDelete({ user: req.user._id });

    // End any active stranger chats
    const activeChat = await StrangerChat.findOne({
      'participants.user': req.user._id,
      status: { $in: ['waiting', 'active'] }
    });

    if (activeChat) {
      activeChat.status = 'ended';
      activeChat.endedAt = new Date();
      
      // Calculate duration
      if (activeChat.startedAt) {
        activeChat.duration = Math.floor((activeChat.endedAt - activeChat.startedAt) / 1000);
      }

      // Mark user as left
      const participant = activeChat.participants.find(p => p.user.toString() === req.user._id.toString());
      if (participant) {
        participant.leftAt = new Date();
      }

      await activeChat.save();

      // Notify other participant
      const otherParticipant = activeChat.participants.find(p => p.user.toString() !== req.user._id.toString());
      if (otherParticipant) {
        await createNotification(otherParticipant.user, req.user._id, 'stranger_left', 'Stranger left', 'Your stranger chat partner has left the conversation.');
      }
    }

    res.json({ message: 'Left stranger chat queue' });
  } catch (error) {
    console.error('Leave stranger chat error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current stranger chat
router.get('/current', auth, async (req, res) => {
  try {
    const strangerChat = await StrangerChat.findOne({
      'participants.user': req.user._id,
      status: { $in: ['waiting', 'active'] }
    }).populate('participants.user', 'username firstName lastName avatar');

    if (!strangerChat) {
      return res.status(404).json({ message: 'No active stranger chat found' });
    }

    res.json(strangerChat);
  } catch (error) {
    console.error('Get current stranger chat error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send message in stranger chat
router.post('/message', auth, async (req, res) => {
  try {
    const { content } = req.body;

    const strangerChat = await StrangerChat.findOne({
      'participants.user': req.user._id,
      status: { $in: ['waiting', 'active'] }
    });

    if (!strangerChat) {
      return res.status(404).json({ message: 'No active stranger chat found' });
    }

    // Add message
    strangerChat.messages.push({
      sender: req.user._id,
      content
    });

    await strangerChat.save();

    // Notify other participant
    const otherParticipant = strangerChat.participants.find(p => p.user.toString() !== req.user._id.toString());
    if (otherParticipant) {
      await createNotification(otherParticipant.user, req.user._id, 'stranger_message', 'New message', 'You received a message from your stranger chat partner.');
    }

    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Send stranger message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// End stranger chat
router.post('/end', auth, async (req, res) => {
  try {
    const { rating, reportReason } = req.body;

    const strangerChat = await StrangerChat.findOne({
      'participants.user': req.user._id,
      status: { $in: ['waiting', 'active'] }
    });

    if (!strangerChat) {
      return res.status(404).json({ message: 'No active stranger chat found' });
    }

    strangerChat.status = 'ended';
    strangerChat.endedAt = new Date();
    
    if (rating) {
      strangerChat.rating = rating;
    }
    
    if (reportReason) {
      strangerChat.reportReason = reportReason;
    }

    // Calculate duration
    if (strangerChat.startedAt) {
      strangerChat.duration = Math.floor((strangerChat.endedAt - strangerChat.startedAt) / 1000);
    }

    // Mark user as left
    const participant = strangerChat.participants.find(p => p.user.toString() === req.user._id.toString());
    if (participant) {
      participant.leftAt = new Date();
    }

    await strangerChat.save();

    // Remove from queue
    await StrangerQueue.findOneAndDelete({ user: req.user._id });

    // Notify other participant
    const otherParticipant = strangerChat.participants.find(p => p.user.toString() !== req.user._id.toString());
    if (otherParticipant) {
      await createNotification(otherParticipant.user, req.user._id, 'stranger_ended', 'Chat ended', 'Your stranger chat partner has ended the conversation.');
    }

    res.json({ message: 'Stranger chat ended' });
  } catch (error) {
    console.error('End stranger chat error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get queue status
router.get('/queue-status', auth, async (req, res) => {
  try {
    const queueEntry = await StrangerQueue.findOne({ user: req.user._id });
    
    if (!queueEntry) {
      return res.status(404).json({ message: 'Not in queue' });
    }

    const queuePosition = await getQueuePosition(req.user._id);
    const estimatedWaitTime = await getEstimatedWaitTime();

    res.json({
      status: queueEntry.status,
      position: queuePosition,
      estimatedWaitTime,
      joinedAt: queueEntry.joinedAt
    });
  } catch (error) {
    console.error('Get queue status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get stranger chat history
router.get('/history', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const strangerChats = await StrangerChat.find({
      'participants.user': req.user._id,
      status: 'ended'
    })
    .populate('participants.user', 'username firstName lastName avatar')
    .sort({ endedAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

    res.json(strangerChats);
  } catch (error) {
    console.error('Get stranger chat history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to find a match
async function findMatch(userId, preferences) {
  const match = await StrangerQueue.findOne({
    user: { $ne: userId },
    status: 'waiting',
    isOnline: true,
    lastActivity: { $gte: new Date(Date.now() - 5 * 60 * 1000) }, // Active in last 5 minutes
    $or: [
      { 'preferences.gender': 'any' },
      { 'preferences.gender': preferences.gender },
      { 'preferences.gender': 'any' }
    ],
    'preferences.ageRange.min': { $lte: preferences.ageRange.max },
    'preferences.ageRange.max': { $gte: preferences.ageRange.min }
  }).populate('user', 'username firstName lastName avatar');

  return match;
}

// Helper function to get queue position
async function getQueuePosition(userId) {
  const position = await StrangerQueue.countDocuments({
    status: 'waiting',
    joinedAt: { $lt: await StrangerQueue.findOne({ user: userId }).then(q => q?.joinedAt) }
  });
  return position + 1;
}

// Helper function to get estimated wait time
async function getEstimatedWaitTime() {
  const queueCount = await StrangerQueue.countDocuments({ status: 'waiting' });
  // Rough estimate: 30 seconds per person in queue
  return Math.max(30, queueCount * 30);
}

// Helper function to create notification
async function createNotification(userId, senderId, type, title, message) {
  try {
    const notification = new Notification({
      user: userId,
      sender: senderId,
      type,
      title,
      message,
      data: {
        action: 'stranger_chat'
      }
    });
    await notification.save();
  } catch (error) {
    console.error('Create notification error:', error);
  }
}

export default router; 