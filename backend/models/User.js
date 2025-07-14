import mongoose from 'mongoose';
import userSchema from '../schemas/UserSchema.js';

export const User = mongoose.model('User', userSchema); 