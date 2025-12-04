import mongoose from 'mongoose';
import { MONGO_URI } from './env';

export const connectDB = async (): Promise<void> => {
  if (!MONGO_URI) {
    console.error('MONGO_URI not provided in env');
    process.exit(1);
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
