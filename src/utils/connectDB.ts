import mongoose from "mongoose";

import logger from "./logger";
import config from "../config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.DB_URI);
    logger.info("Database connected");
  } catch (error: any) {
    logger.error(error.message);
  }
};

export default connectDB;
