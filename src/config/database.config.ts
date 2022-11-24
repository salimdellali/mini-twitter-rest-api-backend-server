import mongoose from 'mongoose';

export class MongoDBConfiguration {
  static instance: MongoDBConfiguration;

  private constructor() {}

  static get(): MongoDBConfiguration {
    if (!MongoDBConfiguration.instance) {
      MongoDBConfiguration.instance = new MongoDBConfiguration();
    }
    return MongoDBConfiguration.instance;
  }

  async connect(connectionString: string, dbName: string) {
    // @TODO insert a logger
    try {
      await mongoose.connect(connectionString, { dbName });
      console.log('Connection to MongoDB established');
    } catch (error: any) {
      console.error(`Error connecting to MongoDB : ${error.message}`);
      process.exit(1);
    }
  }
}

const mongoDBConfiguration = MongoDBConfiguration.get();
export { mongoDBConfiguration as Database };
