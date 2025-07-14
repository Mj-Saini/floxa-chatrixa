import mongoose from 'mongoose';
import strangerChatSchema from '../schemas/StrangerChatSchema.js';

export const StrangerChat = mongoose.model('StrangerChat', strangerChatSchema); 