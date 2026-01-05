import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const dbURI = process.env.MONGO_URI || "";

export const connectDB = async () => {
    try {
        if (!dbURI) {
            throw new Error("MONGO_URI is not defined in .env file");
        }
        await mongoose.connect(dbURI);
        console.log(' MongoDB connected to eshop_db');
    } catch (err) {
        console.error(" MongoDB connection error:", err);
        process.exit(1);
    }
}