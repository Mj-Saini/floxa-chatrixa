import express from 'express';
import { User } from '../models/index.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get user settings
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const settings = {
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        gender: user.gender,
        country: user.country,
        avatar: user.avatar
      },
      privacy: {
        showOnlineStatus: user.showOnlineStatus,
        showLastSeen: user.showLastSeen,
        allowMessagesFrom: user.allowMessagesFrom,
        profileVisibility: user.profileVisibility
      },
      notifications: {
        emailNotifications: user.emailNotifications,
        pushNotifications: user.pushNotifications,
        messageNotifications: user.messageNotifications,
        groupNotifications: user.groupNotifications,
        soundEnabled: user.soundEnabled,
        vibrationEnabled: user.vibrationEnabled
      },
      chat: {
        messagePreview: user.messagePreview,
        readReceipts: user.readReceipts,
        typingIndicator: user.typingIndicator,
        autoDownload: user.autoDownload,
        theme: user.theme,
        fontSize: user.fontSize
      },
      security: {
        twoFactorEnabled: user.twoFactorEnabled,
        loginNotifications: user.loginNotifications,
        sessionTimeout: user.sessionTimeout
      }
    };

    res.json(settings);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update profile settings
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, bio, gender, country, avatar } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (bio !== undefined) user.bio = bio;
    if (gender !== undefined) user.gender = gender;
    if (country !== undefined) user.country = country;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    res.json({
      message: 'Profile settings updated successfully',
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        gender: user.gender,
        country: user.country,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Update profile settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update privacy settings
router.put('/privacy', auth, async (req, res) => {
  try {
    const { showOnlineStatus, showLastSeen, allowMessagesFrom, profileVisibility } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update privacy fields
    if (showOnlineStatus !== undefined) user.showOnlineStatus = showOnlineStatus;
    if (showLastSeen !== undefined) user.showLastSeen = showLastSeen;
    if (allowMessagesFrom !== undefined) user.allowMessagesFrom = allowMessagesFrom;
    if (profileVisibility !== undefined) user.profileVisibility = profileVisibility;

    await user.save();

    res.json({
      message: 'Privacy settings updated successfully',
      privacy: {
        showOnlineStatus: user.showOnlineStatus,
        showLastSeen: user.showLastSeen,
        allowMessagesFrom: user.allowMessagesFrom,
        profileVisibility: user.profileVisibility
      }
    });
  } catch (error) {
    console.error('Update privacy settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update notification settings
router.put('/notifications', auth, async (req, res) => {
  try {
    const { 
      emailNotifications, 
      pushNotifications, 
      messageNotifications, 
      groupNotifications,
      soundEnabled,
      vibrationEnabled
    } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update notification fields
    if (emailNotifications !== undefined) user.emailNotifications = emailNotifications;
    if (pushNotifications !== undefined) user.pushNotifications = pushNotifications;
    if (messageNotifications !== undefined) user.messageNotifications = messageNotifications;
    if (groupNotifications !== undefined) user.groupNotifications = groupNotifications;
    if (soundEnabled !== undefined) user.soundEnabled = soundEnabled;
    if (vibrationEnabled !== undefined) user.vibrationEnabled = vibrationEnabled;

    await user.save();

    res.json({
      message: 'Notification settings updated successfully',
      notifications: {
        emailNotifications: user.emailNotifications,
        pushNotifications: user.pushNotifications,
        messageNotifications: user.messageNotifications,
        groupNotifications: user.groupNotifications,
        soundEnabled: user.soundEnabled,
        vibrationEnabled: user.vibrationEnabled
      }
    });
  } catch (error) {
    console.error('Update notification settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update chat settings
router.put('/chat', auth, async (req, res) => {
  try {
    const { 
      messagePreview, 
      readReceipts, 
      typingIndicator, 
      autoDownload,
      theme,
      fontSize
    } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update chat fields
    if (messagePreview !== undefined) user.messagePreview = messagePreview;
    if (readReceipts !== undefined) user.readReceipts = readReceipts;
    if (typingIndicator !== undefined) user.typingIndicator = typingIndicator;
    if (autoDownload !== undefined) user.autoDownload = autoDownload;
    if (theme !== undefined) user.theme = theme;
    if (fontSize !== undefined) user.fontSize = fontSize;

    await user.save();

    res.json({
      message: 'Chat settings updated successfully',
      chat: {
        messagePreview: user.messagePreview,
        readReceipts: user.readReceipts,
        typingIndicator: user.typingIndicator,
        autoDownload: user.autoDownload,
        theme: user.theme,
        fontSize: user.fontSize
      }
    });
  } catch (error) {
    console.error('Update chat settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update security settings
router.put('/security', auth, async (req, res) => {
  try {
    const { twoFactorEnabled, loginNotifications, sessionTimeout } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update security fields
    if (twoFactorEnabled !== undefined) user.twoFactorEnabled = twoFactorEnabled;
    if (loginNotifications !== undefined) user.loginNotifications = loginNotifications;
    if (sessionTimeout !== undefined) user.sessionTimeout = sessionTimeout;

    await user.save();

    res.json({
      message: 'Security settings updated successfully',
      security: {
        twoFactorEnabled: user.twoFactorEnabled,
        loginNotifications: user.loginNotifications,
        sessionTimeout: user.sessionTimeout
      }
    });
  } catch (error) {
    console.error('Update security settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset settings to default
router.post('/reset', auth, async (req, res) => {
  try {
    const { section } = req.body; // 'all', 'privacy', 'notifications', 'chat', 'security'
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (section === 'all' || section === 'privacy') {
      user.showOnlineStatus = true;
      user.showLastSeen = true;
      user.allowMessagesFrom = 'all';
      user.profileVisibility = 'public';
    }

    if (section === 'all' || section === 'notifications') {
      user.emailNotifications = true;
      user.pushNotifications = true;
      user.messageNotifications = true;
      user.groupNotifications = true;
      user.soundEnabled = true;
      user.vibrationEnabled = true;
    }

    if (section === 'all' || section === 'chat') {
      user.messagePreview = true;
      user.readReceipts = true;
      user.typingIndicator = true;
      user.autoDownload = true;
      user.theme = 'light';
      user.fontSize = 'medium';
    }

    if (section === 'all' || section === 'security') {
      user.twoFactorEnabled = false;
      user.loginNotifications = true;
      user.sessionTimeout = 30; // minutes
    }

    await user.save();

    res.json({
      message: `${section === 'all' ? 'All' : section} settings reset to default`
    });
  } catch (error) {
    console.error('Reset settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 