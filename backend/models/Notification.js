import mongoose from 'mongoose';
import notificationSchema from '../schemas/NotificationSchema.js';

export const Notification = mongoose.model('Notification', notificationSchema); 