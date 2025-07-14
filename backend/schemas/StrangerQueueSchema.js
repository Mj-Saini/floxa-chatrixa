import mongoose from 'mongoose';

const strangerQueueSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['waiting', 'matched', 'cancelled'],
    default: 'waiting'
  },
  preferences: {
    language: {
      type: String,
      default: 'en'
    },
    ageRange: {
      min: {
        type: Number,
        default: 18
      },
      max: {
        type: Number,
        default: 99
      }
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'any'],
      default: 'any'
    },
    interests: [String]
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  matchedAt: {
    type: Date
  },
  cancelledAt: {
    type: Date
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  isOnline: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
strangerQueueSchema.index({ status: 1, joinedAt: 1 });
strangerQueueSchema.index({ user: 1 });
strangerQueueSchema.index({ 'preferences.language': 1 });
strangerQueueSchema.index({ 'preferences.gender': 1 });

export default strangerQueueSchema; 