import mongoose from "mongoose";

import logger from "./logger";
import config from "../config";

const connectDB = async () => {
  try {
    await mongoose.connect(
      // config.isDevelopment ? config.DB_URI : config.DB_URI_PROD
      config.DB_URI_PROD
    );
    logger.info("Database connected");
  } catch (error: any) {
    logger.error(error.message);
  }
};

export default connectDB;
