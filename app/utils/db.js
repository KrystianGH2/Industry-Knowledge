import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/users';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function dbConnectUsers() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default dbConnectUsers;
