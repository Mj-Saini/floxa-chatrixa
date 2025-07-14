import express from 'express';
import { Message, Chat, User } from '../models/index.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get messages for a chat
router.get('/chat/:chatId', auth, async (req, res) => {
  try {
    const { chatId } = req.params;
    const { page = 1, limit = 50, before } = req.query;

    // Verify user is part of the chat
    const chat = await Chat.findById(chatId);
    if (!chat || !chat.participants.includes(req.user._id)) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    let query = { chat: chatId };
    
    // Get messages before a specific date (for pagination)
    if (before) {
      query.createdAt = { $lt: new Date(before) };
    }

    const messages = await Message.find(query)
      .populate('sender', 'username firstName lastName avatar')
      .populate('replyTo', 'content sender')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json(messages.reverse());
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send a message
router.post('/', auth, async (req, res) => {
  try {
    const { chatId, content, type = 'text', replyTo, fileUrl, fileName, fileSize } = req.body;

    // Verify user is part of the chat
    const chat = await Chat.findById(chatId);
    if (!chat || !chat.participants.includes(req.user._id)) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    const message = new Message({
      chat: chatId,
      sender: req.user._id,
      content,
      type,
      replyTo,
      fileUrl,
      fileName,
      fileSize
    });

    await message.save();
    await message.populate('sender', 'username firstName lastName avatar');
    await message.populate('replyTo', 'content sender');

    // Update chat's last message
    chat.lastMessage = {
      content,
      sender: req.user._id,
      timestamp: new Date()
    };
    await chat.save();

    res.status(201).json(message);
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit a message
router.put('/:messageId', auth, async (req, res) => {
  try {
    const { messageId } = req.params;
    const { content } = req.body;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Check if user is the sender
    if (message.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only edit your own messages' });
    }

    // Check if message is too old (e.g., 15 minutes)
    const messageAge = Date.now() - message.createdAt.getTime();
    if (messageAge > 15 * 60 * 1000) {
      return res.status(400).json({ message: 'Message is too old to edit' });
    }

    message.content = content;
    message.edited = true;
    message.editedAt = new Date();

    await message.save();
    await message.populate('sender', 'username firstName lastName avatar');

    res.json(message);
  } catch (error) {
    console.error('Edit message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a message
router.delete('/:messageId', auth, async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Check if user is the sender or admin
    const chat = await Chat.findById(message.chat);
    const isSender = message.sender.toString() === req.user._id.toString();
    const isAdmin = chat && chat.admins && chat.admins.includes(req.user._id);

    if (!isSender && !isAdmin) {
      return res.status(403).json({ message: 'You can only delete your own messages' });
    }

    await Message.findByIdAndDelete(messageId);

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark message as read
router.put('/:messageId/read', auth, async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Check if already read by this user
    const alreadyRead = message.readBy.some(read => read.user.toString() === req.user._id.toString());
    
    if (!alreadyRead) {
      message.readBy.push({
        user: req.user._id,
        readAt: new Date()
      });
      message.isRead = true;
      await message.save();
    }

    res.json({ message: 'Message marked as read' });
  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search messages
router.get('/search', auth, async (req, res) => {
  try {
    const { query, chatId, limit = 20 } = req.query;

    let searchQuery = { content: { $regex: query, $options: 'i' } };

    if (chatId) {
      // Verify user is part of the chat
      const chat = await Chat.findById(chatId);
      if (!chat || !chat.participants.includes(req.user._id)) {
        return res.status(404).json({ message: 'Chat not found' });
      }
      searchQuery.chat = chatId;
    } else {
      // Search in all user's chats
      const userChats = await Chat.find({ participants: req.user._id });
      searchQuery.chat = { $in: userChats.map(chat => chat._id) };
    }

    const messages = await Message.find(searchQuery)
      .populate('sender', 'username firstName lastName avatar')
      .populate('chat', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1);

    res.json(messages);
  } catch (error) {
    console.error('Search messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get unread message count
router.get('/unread/count', auth, async (req, res) => {
  try {
    const userChats = await Chat.find({ participants: req.user._id });
    
    const unreadCounts = await Promise.all(
      userChats.map(async (chat) => {
        const count = await Message.countDocuments({
          chat: chat._id,
          sender: { $ne: req.user._id },
          readBy: { $not: { $elemMatch: { user: req.user._id } } }
        });

        return {
          chatId: chat._id,
          chatName: chat.name,
          unreadCount: count
        };
      })
    );

    res.json(unreadCounts);
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 