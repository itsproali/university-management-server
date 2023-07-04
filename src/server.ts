import app from "./app";
import config from "./config";
import connectDB from "./utils/connectDB";
import logger from "./utils/logger";

// Run the server
const run = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Start the server
    app.listen(config.PORT, () => {
      logger.info(`Server listening on port: ${config.PORT}`);
    });
  } catch (error: any) {
    logger.error(error.message);
    // -------- save logs --------
    // logger.error(error.message);
  }
};

run();
