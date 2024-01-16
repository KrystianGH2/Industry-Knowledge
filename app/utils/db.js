// dbConnectUsers.js
import mongoose from 'mongoose';

const MONGODB_URI_USERS = process.env.MONGODB_URI_USERS || 'mongodb://localhost:27017/users';

if (!MONGODB_URI_USERS) {
  throw new Error('Please define the MONGODB_URI_USERS environment variable inside .env.local');
}

async function dbConnectUsers() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(MONGODB_URI_USERS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default dbConnectUsers;
