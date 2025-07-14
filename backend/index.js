import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import groupRoutes from './routes/groups.js';
import userRoutes from './routes/users.js';
import messageRoutes from './routes/messages.js';
import notificationRoutes from './routes/notifications.js';
import fileRoutes from './routes/files.js';
import searchRoutes from './routes/search.js';
import settingsRoutes from './routes/settings.js';
import strangerRoutes from './routes/stranger.js';
import StrangerChatService from './services/strangerChatService.js';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:8081",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chatrixa';
    await mongoose.connect(mongoURI);
    console.log('📊 MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Hello from Chatrixa Backend!' });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// User routes
app.use('/api/users', userRoutes);

// Chat routes
app.use('/api/chat', chatRoutes);

// Message routes
app.use('/api/messages', messageRoutes);

// Group routes
app.use('/api/groups', groupRoutes);

// Notification routes
app.use('/api/notifications', notificationRoutes);

// File upload routes
app.use('/api/files', fileRoutes);

// Search routes
app.use('/api/search', searchRoutes);

// Settings routes
app.use('/api/settings', settingsRoutes);

// Stranger chat routes
app.use('/api/stranger', strangerRoutes);

// Initialize WebSocket services
const strangerChatService = new StrangerChatService(io);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 MongoDB connected successfully`);
  console.log(`🔌 WebSocket server ready`);
}); 