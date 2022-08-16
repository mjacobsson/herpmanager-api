import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo: MongoMemoryServer;

const connectDB = async () => {
  if (process.env['IN_MEM_DB']) {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri('herpmanager-test');
    console.log(`Mongo in-memory server URI: ${uri}`);
    await mongoose.connect(uri, { dbName: 'TESTDB' });
  } else {
    await mongoose.connect('mongodb://localhost:27017/herpmanager');
  }
};

const closeDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
};

export { connectDB, closeDB };
