// dbConnectUsers.js
import mongoose from 'mongoose';

const MONGODB_URI= process.env.MONGODB_URI;

console.log('MONGODB_URI_USERS:', MONGODB_URI);

async function dbConnectUsers() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB (Users)');
    } else {
      console.log('Already connected to MongoDB (Users)');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB (Users):', error.message);
  }
}

export default dbConnectUsers;
