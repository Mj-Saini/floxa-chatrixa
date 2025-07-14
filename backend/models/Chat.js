import mongoose from 'mongoose';
import chatSchema from '../schemas/ChatSchema.js';

export const Chat = mongoose.model('Chat', chatSchema); 