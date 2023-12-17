import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';
import { MongoClient } from 'mongodb';
import { env } from '../env';

const connectionString = env.mongo.mongo_ip;

export const mongoClient = new MongoClient(connectionString);
export const db = mongoClient.db();
export const mongoLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
  try {
    await mongoClient.connect();
    if (settings) {
      settings.setData('mongoClient', mongoClient);
      settings.setData('db', db);
      settings.onShutdown(() => mongoClient.close());
    }
  } catch (error) {
    console.error(`${env.app.name} connection to database failed! ${error}`);
  }
};
