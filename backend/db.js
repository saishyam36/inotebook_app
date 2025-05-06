import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.MONGODB_URI;

export const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};