import mongoose from 'mongoose';

const strangerChatSchema = new mongoose.Schema({
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    leftAt: {
      type: Date
    }
  }],
  status: {
    type: String,
    enum: ['waiting', 'active', 'ended'],
    default: 'waiting'
  },
  startedAt: {
    type: Date
  },
  endedAt: {
    type: Date
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: 1000
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  preferences: {
    language: {
      type: String,
      default: 'en'
    },
    ageRange: {
      min: Number,
      max: Number
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'any']
    },
    interests: [String]
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  reportReason: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Index for efficient queries
strangerChatSchema.index({ status: 1, 'participants.user': 1 });
strangerChatSchema.index({ createdAt: -1 });

export default strangerChatSchema; 