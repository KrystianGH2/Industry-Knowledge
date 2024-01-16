// dbConnectUserReports.js
import mongoose from 'mongoose';

const MONGODB_URI_REPORTS = process.env.MONGODB_URI_REPORTS || 'mongodb://localhost:27017/safetyconcerns';

if (!MONGODB_URI_REPORTS) {
  throw new Error('Please define the MONGODB_URI_REPORTS environment variable inside .env.local');
}

async function dbConnectUserReports() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(MONGODB_URI_REPORTS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default dbConnectUserReports;
