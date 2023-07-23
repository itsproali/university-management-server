/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import app from "./app";
import config from "./config";

import { Server } from "http";
import logger from "./utils/logger";
import connectDB from "./utils/connectDB";

// Uncaught exception
process.on("uncaughtException", (err: any) => {
  logger.error("UNCAUGHT EXCEPTION! 💣 Shutting down...");
  logger.error(err.message);
  process.exit(1);
});

let server: Server;

// Run the server
const run = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Start the server
    server = app.listen(config.PORT, () => {
      logger.info(`Server listening on port: ${config.PORT}`);
    });
  } catch (error: any) {
    logger.error(error.message);
  }

  // Unhandled promise rejection
  process.on("unhandledRejection", (err: any) => {
    logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
    logger.error(err.message);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

run();

// SIGTERM
process.on("SIGTERM", () => {
  logger.info("SIGTERM RECEIVED 🚦 Shutting down gracefully");
  if (server) {
    server.close();
  }
});
