import mongoose from 'mongoose';
import messageSchema from '../schemas/MessageSchema.js';

export const Message = mongoose.model('Message', messageSchema); 