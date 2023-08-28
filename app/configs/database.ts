import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import logger from '../lib/logger';

dotenv.config();

export default class MongoDb {
    private readonly username_db = process.env.DB_USERNAME;
    private readonly password_db = process.env.DB_PASSWORD;
    /**
     * Connects to the MongoDB database
     */
    public async connect(): Promise<void> {
        try {
            await mongoose.connect(`mongodb+srv://${this.username_db}:${this.password_db}@projecttypescript.bqvjyfg.mongodb.net/?retryWrites=true&w=majority`);
            logger.info('Database connected');
        } catch (error) {
            logger.error(`Error connecting to database: ${error}`);
        }
    }
}
