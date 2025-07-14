import mongoose from 'mongoose';
import groupSchema from '../schemas/GroupSchema.js';

export const Group = mongoose.model('Group', groupSchema); 