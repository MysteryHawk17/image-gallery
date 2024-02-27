import mongoose from 'mongoose';
import { mongoURI } from '../config';

async function connectDB() {
    const uri = mongoURI;
    try {
        if (uri == undefined) {
            throw new Error('MONGO_URI is not defined');
        }
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}

export { connectDB};