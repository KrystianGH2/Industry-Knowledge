// dbConnectUserReports.js
import mongoose from 'mongoose';

const MONGODB_URI_REPORTS = process.env.MONGODB_URI_REPORTS || 'mongodb://localhost:27017/safetyconcerns';

console.log('MONGODB_URI_REPORTS:', MONGODB_URI_REPORTS);

async function dbConnectUserReports() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI_REPORTS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB (Safety Concerns)');
    } else {
      console.log('Already connected to MongoDB (Safety Concerns)');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB (Safety Concerns):', error.message);
  }
}

export default dbConnectUserReports;
