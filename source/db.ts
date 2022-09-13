import mongoose from 'mongoose';

const connectDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/herpmanager', {
    dbName: 'herpmanager-test'
  });
};

const closeDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

export { connectDB, closeDB };
