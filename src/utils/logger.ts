import { createLogger, format, transports, Logger } from "winston";
const { combine, timestamp, printf, colorize, prettyPrint } = format;
import DailyRotateFile from "winston-daily-rotate-file";
import config from "../config";

// Format log messages
const myFormat = printf(({ level, message }) => {
  const date = new Date().toLocaleDateString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return `${level}: ${message} ${date}`;
});

// Create logger
const logger: Logger = createLogger({
  level: "info",
  format: combine(
    timestamp(),
    printf(
      ({ level, message, timestamp }) => `${timestamp} ${level} ${message}`
    ),
    prettyPrint()
  ),
  transports: [
    new transports.Console({
      format: combine(colorize(), timestamp(), myFormat),
    }),
  ],
});

if (config.isDevelopment) {
  logger.add(
    new DailyRotateFile({
      filename: "logs/combined-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "1d",
      level: "info",
    })
  );
  logger.add(
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "1d",
      level: "error",
    })
  );
}

export default logger;
