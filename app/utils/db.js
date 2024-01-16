// dbConnectUsers.js
import mongoose from 'mongoose';

const MONGODB_URI_USERS = process.env.MONGODB_URI_USERS || 'mongodb://localhost:27017/users';

console.log('MONGODB_URI_USERS:', MONGODB_URI_USERS);

async function dbConnectUsers() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI_USERS);
      console.log('Connected to MongoDB (Users)');
    } else {
      console.log('Already connected to MongoDB (Users)');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB (Users):', error.message);
  }
}

export default dbConnectUsers;
