import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/server-config.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected successfully');

    // Check if the index exists before creating it
    const eventCollection = mongoose.connection.collection('events');
    const userCollection = mongoose.connection.collection('users');


  } catch (error) {
    console.log('Something went wrong in connecting to DB or creating indexes', error);
  }
};