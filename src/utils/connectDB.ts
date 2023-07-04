import mongoose from "mongoose";
import config from "../config";
import logger from "./logger";

const connectDB = async () => {
  try {
    await mongoose.connect(config.DB_URI);
    logger.info("Database connected");
  } catch (error: any) {
    logger.error(error.message);
  }
};

export default connectDB;
