// dbConnectUserReports.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI ;

console.log('MONGODB_URI_REPORTS:', MONGODB_URI);

async function dbConnectUserReports() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI, {
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
