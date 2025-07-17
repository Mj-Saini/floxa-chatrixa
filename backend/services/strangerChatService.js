import { StrangerQueue, StrangerChat, User, Notification } from '../models/index.js';

class StrangerChatService {
  constructor(io) {
    this.io = io;
    this.activeUsers = new Map(); // userId -> socketId
    this.queueUsers = new Set(); // Set of userIds in queue
    this.matchingInterval = null;
    
    this.setupSocketHandlers();
    this.startMatchingService();
  }

  setupSocketHandlers() {
    this.io.on('connection', (socket) => {
      console.log('🔌 New Socket.IO connection:', socket.id);

      // Join stranger chat queue
      socket.on('join-stranger-queue', async (data) => {
        try {
          const { userId, preferences } = data;
          
          if (!userId) {
            socket.emit('error', { message: 'User ID required' });
            return;
          }

          console.log(`👤 User ${userId} joining queue via socket ${socket.id}`);

          // Check if user is already connected with a different socket
          const existingSocketId = this.activeUsers.get(userId);
          if (existingSocketId && existingSocketId !== socket.id) {
            console.log(`⚠️ User ${userId} already connected with socket ${existingSocketId}, updating to ${socket.id}`);
          }

          // Store active user
          this.activeUsers.set(userId, socket.id);
          this.queueUsers.add(userId);

          console.log(`📊 Active users: ${this.activeUsers.size}, Queue users: ${this.queueUsers.size}`);

          // Add to database queue
          await this.addToQueue(userId, preferences);
          
          socket.emit('queue-joined', { message: 'Added to queue' });
          
          // Try to find immediate match
          await this.tryMatch(userId);
          
        } catch (error) {
          console.error('Join queue error:', error);
          socket.emit('error', { message: 'Failed to join queue' });
        }
      });

      // Leave stranger chat queue
      socket.on('leave-stranger-queue', async (data) => {
        try {
          const { userId } = data;
          
          this.activeUsers.delete(userId);
          this.queueUsers.delete(userId);
          
          await this.removeFromQueue(userId);
          
          socket.emit('queue-left', { message: 'Left queue' });
          
        } catch (error) {
          console.error('Leave queue error:', error);
          socket.emit('error', { message: 'Failed to leave queue' });
        }
      });

      // Send message in stranger chat
      socket.on('stranger-message', async (data) => {
        try {
          const { userId, content, chatId } = data;
          
          const strangerChat = await StrangerChat.findById(chatId);
          if (!strangerChat) {
            socket.emit('error', { message: 'Chat not found' });
            return;
          }

          // Add message to chat
          strangerChat.messages.push({
            sender: userId,
            content,
            timestamp: new Date()
          });

          await strangerChat.save();

          // Send message to other participant
          const otherParticipant = strangerChat.participants.find(p => p.user.toString() !== userId.toString());
          if (otherParticipant) {
            const otherSocketId = this.activeUsers.get(otherParticipant.user.toString());
            if (otherSocketId) {
              this.io.to(otherSocketId).emit('stranger-message-received', {
                content,
                sender: userId,
                timestamp: new Date()
              });
            }
          }

          socket.emit('message-sent', { message: 'Message sent' });
          
        } catch (error) {
          console.error('Send message error:', error);
          socket.emit('error', { message: 'Failed to send message' });
        }
      });

      // End stranger chat
      socket.on('end-stranger-chat', async (data) => {
        try {
          const { userId, chatId, rating, reportReason } = data;
          
          const strangerChat = await StrangerChat.findById(chatId);
          if (!strangerChat) {
            socket.emit('error', { message: 'Chat not found' });
            return;
          }

          // End chat
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

          await strangerChat.save();

          // Notify other participant
          const otherParticipant = strangerChat.participants.find(p => p.user.toString() !== userId.toString());
          if (otherParticipant) {
            const otherSocketId = this.activeUsers.get(otherParticipant.user.toString());
            if (otherSocketId) {
              this.io.to(otherSocketId).emit('stranger-chat-ended', {
                message: 'Your stranger chat partner has ended the conversation.'
              });
            }
          }

          socket.emit('chat-ended', { message: 'Chat ended' });
          
        } catch (error) {
          console.error('End chat error:', error);
          socket.emit('error', { message: 'Failed to end chat' });
        }
      });

      // Update user activity
      socket.on('update-activity', async (data) => {
        try {
          const { userId } = data;
          
          // Update last activity in queue
          await StrangerQueue.findOneAndUpdate(
            { user: userId },
            { lastActivity: new Date() }
          );
          
        } catch (error) {
          console.error('Update activity error:', error);
        }
      });

      // Disconnect handler
      socket.on('disconnect', async () => {
        console.log('User disconnected:', socket.id);
        
        // Find user by socket ID
        let disconnectedUserId = null;
        for (const [userId, socketId] of this.activeUsers.entries()) {
          if (socketId === socket.id) {
            disconnectedUserId = userId;
            break;
          }
        }

        if (disconnectedUserId) {
          this.activeUsers.delete(disconnectedUserId);
          this.queueUsers.delete(disconnectedUserId);
          
          // Remove from database queue
          await this.removeFromQueue(disconnectedUserId);
        }
      });
    });
  }

  async addToQueue(userId, preferences) {
    try {
      // Check if already in queue
      const existingQueue = await StrangerQueue.findOne({ user: userId });
      if (existingQueue) {
        return;
      }

      const queueEntry = new StrangerQueue({
        user: userId,
        preferences: preferences || {
          language: 'en',
          ageRange: { min: 18, max: 99 },
          gender: 'any',
          interests: []
        },
        isOnline: true,
        lastActivity: new Date()
      });

      await queueEntry.save();
      // Always try to match all waiting users
      const waitingUsers = await StrangerQueue.find({ status: 'waiting' });
      for (const user of waitingUsers) {
        await this.tryMatch(user.user.toString());
      }
    } catch (error) {
      console.error('Add to queue error:', error);
    }
  }

  async removeFromQueue(userId) {
    try {
      await StrangerQueue.findOneAndDelete({ user: userId });
    } catch (error) {
      console.error('Remove from queue error:', error);
    }
  }

  async tryMatch(userId) {
    try {
      const userQueue = await StrangerQueue.findOne({ user: userId, status: 'waiting' });
      if (!userQueue) return;

      // Find another waiting user
      const match = await StrangerQueue.findOne({
        user: { $ne: userId },
        status: 'waiting',
        isOnline: true,
        lastActivity: { $gte: new Date(Date.now() - 5 * 60 * 1000) }
      }).populate('user', 'username firstName lastName avatar country gender');

      if (match) {
        // Create chat
        const strangerChat = new StrangerChat({
          participants: [
            { user: userId },
            { user: match.user._id }
          ],
          status: 'active',
          startedAt: new Date(),
          preferences: userQueue.preferences
        });

        await strangerChat.save();

        // Update both users' queue status
        await StrangerQueue.updateMany(
          { user: { $in: [userId, match.user._id] } },
          { status: 'matched', matchedAt: new Date() }
        );

        // Remove from active queue set
        this.queueUsers.delete(userId);
        this.queueUsers.delete(match.user._id.toString());

        // Populate the chat with user details for the response
        await strangerChat.populate('participants.user', 'username firstName lastName avatar country gender');

        // Get user details for both users
        const userDetails = await User.findById(userId).select('username firstName lastName avatar country gender');
        const matchDetails = match.user;

        // Robust notification logic
        const notifyBoth = async (attempt = 1) => {
        const userSocketId = this.activeUsers.get(userId);
        const matchSocketId = this.activeUsers.get(match.user._id.toString());
          let notified = true;

        if (userSocketId) {
          this.io.to(userSocketId).emit('match-found', {
            chat: strangerChat,
            partner: matchDetails
          });
          } else {
            notified = false;
        }

        if (matchSocketId) {
          this.io.to(matchSocketId).emit('match-found', {
            chat: strangerChat,
            partner: userDetails
          });
          } else {
            notified = false;
          }

          // If either socket is missing, retry up to 5 times with 200ms delay
          if (!notified && attempt < 5) {
            setTimeout(() => notifyBoth(attempt + 1), 200);
          }
        };
        notifyBoth();
      }
    } catch (error) {
      console.error('Try match error:', error);
    }
  }

  startMatchingService() {
    // Run matching every 2 seconds
    this.matchingInterval = setInterval(async () => {
      try {
        const waitingUsers = await StrangerQueue.find({ status: 'waiting' });
        for (const user of waitingUsers) {
          await this.tryMatch(user.user.toString());
        }
      } catch (error) {
        console.error('Matching service error:', error);
      }
    }, 2000);
  }

  stopMatchingService() {
    if (this.matchingInterval) {
      clearInterval(this.matchingInterval);
    }
  }

  getQueueStats() {
    return {
      activeUsers: this.activeUsers.size,
      queueUsers: this.queueUsers.size
    };
  }
}

export default StrangerChatService; 