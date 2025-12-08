import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectDB = async () => {
  try {
    console.log("Connecting to the Mongo DB...");
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("Database connected...");
  } catch (error) {
    console.log("MongoDB connection error!", error.message);
    process.exit(1);
  }
};
