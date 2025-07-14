import express from 'express';
import { Group, User } from '../models/index.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get user's groups
router.get('/', auth, async (req, res) => {
  try {
    const groups = await Group.find({
      'members.user': req.user._id,
      isActive: true
    })
    .populate('creator', 'username firstName lastName')
    .populate('admins', 'username firstName lastName')
    .sort({ updatedAt: -1 });

    res.json(groups);
  } catch (error) {
    console.error('Get groups error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new group
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, isPrivate = false } = req.body;

    const group = new Group({
      name,
      description,
      creator: req.user._id,
      admins: [req.user._id],
      members: [{
        user: req.user._id,
        role: 'admin'
      }],
      isPrivate
    });

    await group.save();
    await group.populate('creator', 'username firstName lastName');

    res.status(201).json(group);
  } catch (error) {
    console.error('Create group error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add member to group
router.post('/:groupId/members', auth, async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Check if user is admin
    const isAdmin = group.admins.includes(req.user._id);
    if (!isAdmin) {
      return res.status(403).json({ message: 'Only admins can add members' });
    }

    // Check if user is already a member
    const isMember = group.members.some(member => member.user.toString() === userId);
    if (isMember) {
      return res.status(400).json({ message: 'User is already a member' });
    }

    group.members.push({
      user: userId,
      role: 'member'
    });

    await group.save();
    await group.populate('members.user', 'username firstName lastName');

    res.json(group);
  } catch (error) {
    console.error('Add member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove member from group
router.delete('/:groupId/members/:userId', auth, async (req, res) => {
  try {
    const { groupId, userId } = req.params;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Check if user is admin
    const isAdmin = group.admins.includes(req.user._id);
    if (!isAdmin) {
      return res.status(403).json({ message: 'Only admins can remove members' });
    }

    // Remove member
    group.members = group.members.filter(member => member.user.toString() !== userId);
    
    // Remove from admins if they were an admin
    group.admins = group.admins.filter(admin => admin.toString() !== userId);

    await group.save();

    res.json({ message: 'Member removed successfully' });
  } catch (error) {
    console.error('Remove member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 