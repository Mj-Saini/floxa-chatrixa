import express from 'express';
import { Chat, Message, User } from '../models/index.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get user's chats
router.get('/', auth, async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.user._id,
      isActive: true
    })
    .populate('participants', 'username firstName lastName avatar isOnline')
    .populate('lastMessage.sender', 'username')
    .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (error) {
    console.error('Get chats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new chat
router.post('/', auth, async (req, res) => {
  try {
    const { participantId, type = 'private' } = req.body;

    if (type === 'private') {
      // Check if chat already exists
      const existingChat = await Chat.findOne({
        participants: { $all: [req.user._id, participantId] },
        type: 'private'
      });

      if (existingChat) {
        return res.json(existingChat);
      }
    }

    const chat = new Chat({
      participants: [req.user._id, participantId],
      type
    });

    await chat.save();
    await chat.populate('participants', 'username firstName lastName avatar');

    res.status(201).json(chat);
  } catch (error) {
    console.error('Create chat error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get chat messages
router.get('/:chatId/messages', auth, async (req, res) => {
  try {
    const { chatId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const chat = await Chat.findById(chatId);
    if (!chat || !chat.participants.includes(req.user._id)) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    const messages = await Message.find({ chat: chatId })
      .populate('sender', 'username firstName lastName avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json(messages.reverse());
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send message
router.post('/:chatId/messages', auth, async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content, type = 'text' } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat || !chat.participants.includes(req.user._id)) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    const message = new Message({
      chat: chatId,
      sender: req.user._id,
      content,
      type
    });

    await message.save();
    await message.populate('sender', 'username firstName lastName avatar');

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

export default router; 