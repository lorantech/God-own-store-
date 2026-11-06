const mongoose = require('mongoose');
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_URI) {
    console.warn('⚠️  MONGO_URI is not set — database disabled');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, { maxPoolSize: 10 });
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
  }
};
module.exports = connectDB;
