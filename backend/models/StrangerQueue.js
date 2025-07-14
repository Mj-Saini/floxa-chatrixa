import mongoose from 'mongoose';
import strangerQueueSchema from '../schemas/StrangerQueueSchema.js';

export const StrangerQueue = mongoose.model('StrangerQueue', strangerQueueSchema); 