import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 50
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  country: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  lastSeen: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['online', 'offline', 'away', 'busy'],
    default: 'offline'
  },
  // Privacy settings
  showOnlineStatus: {
    type: Boolean,
    default: true
  },
  showLastSeen: {
    type: Boolean,
    default: true
  },
  allowMessagesFrom: {
    type: String,
    enum: ['all', 'contacts', 'none'],
    default: 'all'
  },
  profileVisibility: {
    type: String,
    enum: ['public', 'contacts', 'private'],
    default: 'public'
  },
  // Notification settings
  emailNotifications: {
    type: Boolean,
    default: true
  },
  pushNotifications: {
    type: Boolean,
    default: true
  },
  messageNotifications: {
    type: Boolean,
    default: true
  },
  groupNotifications: {
    type: Boolean,
    default: true
  },
  soundEnabled: {
    type: Boolean,
    default: true
  },
  vibrationEnabled: {
    type: Boolean,
    default: true
  },
  // Chat settings
  messagePreview: {
    type: Boolean,
    default: true
  },
  readReceipts: {
    type: Boolean,
    default: true
  },
  typingIndicator: {
    type: Boolean,
    default: true
  },
  autoDownload: {
    type: Boolean,
    default: true
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'auto'],
    default: 'light'
  },
  fontSize: {
    type: String,
    enum: ['small', 'medium', 'large'],
    default: 'medium'
  },
  // Security settings
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  loginNotifications: {
    type: Boolean,
    default: true
  },
  sessionTimeout: {
    type: Number,
    default: 30 // minutes
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default userSchema; 