import express from 'express';
import { User, Message, Chat, Group } from '../models/index.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Global search
router.get('/global', auth, async (req, res) => {
  try {
    const { query, type, limit = 20 } = req.query;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({ message: 'Search query must be at least 2 characters' });
    }

    const results = {
      users: [],
      messages: [],
      groups: [],
      chats: []
    };

    // Search users
    if (!type || type === 'users') {
      const users = await User.find({
        $or: [
          { username: { $regex: query, $options: 'i' } },
          { firstName: { $regex: query, $options: 'i' } },
          { lastName: { $regex: query, $options: 'i' } }
        ],
        _id: { $ne: req.user._id }
      })
      .select('username firstName lastName avatar isOnline lastSeen bio')
      .limit(limit)
      .sort({ isOnline: -1, lastSeen: -1 });

      results.users = users;
    }

    // Search messages
    if (!type || type === 'messages') {
      const userChats = await Chat.find({ participants: req.user._id });
      const chatIds = userChats.map(chat => chat._id);

      const messages = await Message.find({
        chat: { $in: chatIds },
        content: { $regex: query, $options: 'i' }
      })
      .populate('sender', 'username firstName lastName avatar')
      .populate('chat', 'name')
      .limit(limit)
      .sort({ createdAt: -1 });

      results.messages = messages;
    }

    // Search groups
    if (!type || type === 'groups') {
      const groups = await Group.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ],
        'members.user': req.user._id,
        isActive: true
      })
      .populate('creator', 'username firstName lastName')
      .limit(limit)
      .sort({ updatedAt: -1 });

      results.groups = groups;
    }

    // Search chats
    if (!type || type === 'chats') {
      const chats = await Chat.find({
        participants: req.user._id,
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      })
      .populate('participants', 'username firstName lastName avatar')
      .limit(limit)
      .sort({ updatedAt: -1 });

      results.chats = chats;
    }

    res.json(results);
  } catch (error) {
    console.error('Global search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search users only
router.get('/users', auth, async (req, res) => {
  try {
    const { query, limit = 20, page = 1 } = req.query;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({ message: 'Search query must be at least 2 characters' });
    }

    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } }
      ],
      _id: { $ne: req.user._id }
    })
    .select('username firstName lastName avatar isOnline lastSeen bio')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ isOnline: -1, lastSeen: -1 });

    res.json(users);
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search messages only
router.get('/messages', auth, async (req, res) => {
  try {
    const { query, chatId, limit = 20, page = 1 } = req.query;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({ message: 'Search query must be at least 2 characters' });
    }

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
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    console.error('Search messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search groups only
router.get('/groups', auth, async (req, res) => {
  try {
    const { query, limit = 20, page = 1 } = req.query;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({ message: 'Search query must be at least 2 characters' });
    }

    const groups = await Group.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ],
      'members.user': req.user._id,
      isActive: true
    })
    .populate('creator', 'username firstName lastName')
    .populate('members.user', 'username firstName lastName avatar')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ updatedAt: -1 });

    res.json(groups);
  } catch (error) {
    console.error('Search groups error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Advanced search with filters
router.get('/advanced', auth, async (req, res) => {
  try {
    const { 
      query, 
      type, 
      dateFrom, 
      dateTo, 
      sender, 
      chatId, 
      limit = 20, 
      page = 1 
    } = req.query;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({ message: 'Search query must be at least 2 characters' });
    }

    let searchQuery = { content: { $regex: query, $options: 'i' } };

    // Date range filter
    if (dateFrom || dateTo) {
      searchQuery.createdAt = {};
      if (dateFrom) searchQuery.createdAt.$gte = new Date(dateFrom);
      if (dateTo) searchQuery.createdAt.$lte = new Date(dateTo);
    }

    // Sender filter
    if (sender) {
      searchQuery.sender = sender;
    }

    // Chat filter
    if (chatId) {
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
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    console.error('Advanced search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 