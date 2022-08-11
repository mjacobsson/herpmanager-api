import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo: MongoMemoryServer;

const connectDB = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri('herpmanager');
  console.log(`Mongo in-memory server URI: ${uri}`);

  await mongoose.connect(uri, { dbName: 'TESTDB' });
};

const closeDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
};

export { connectDB, closeDB };
