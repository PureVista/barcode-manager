import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';
import { MongoClient } from 'mongodb';
import { env } from '../env';

const username = encodeURIComponent(env.mongo.user || 'userName');
const password = encodeURIComponent(env.mongo.password || 'pw');
const connectionString =
  env.nodeEnv === 'development'
    ? `mongodb://${username}:${password}@${env.mongo.ip}/${env.mongo.db}?authSource=admin`
    : `mongodb+srv://${username}:${password}@${env.mongo.ip}/${env.mongo.db}?retryWrites=true&w=majority`;

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
