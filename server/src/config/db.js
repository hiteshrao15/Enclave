import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MongoDB connection string is not configured.");
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    logger.info(`MongoDB Connected : ${connection.connection.host}`);
    return connection.connection;
  } catch (error) {
    logger.error(`MongoDB Connection Failed : ${error.message}`);
    throw error;
  }
};

export default connectDB;