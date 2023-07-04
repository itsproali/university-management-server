import { createLogger, format, transports, Logger } from "winston";
const { combine, timestamp, printf, colorize, prettyPrint } = format;
import DailyRotateFile from "winston-daily-rotate-file";

// Format log messages
const myFormat = printf(({ level, message }) => {
  const date = new Date().toLocaleDateString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return `${level}: ${message} ${date}`;
});

// const transport: DailyRotateFile = new DailyRotateFile({
//   filename: "logs/%DATE%.log",
//   datePattern: "YYYY-MM-DD-HH",
//   zippedArchive: true,
//   maxSize: "20m",
//   maxFiles: "1d",
// });

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
    // new transports.File({ filename: "logs/info.log", level: "info" }),
    // new transports.File({ filename: "logs/error.log", level: "error" }),
    // new transports.File({ filename: "logs/war.log", level: "warn" }),
    new DailyRotateFile({
      filename: "logs/combined-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "1d",
      level: "info",
    }),
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "1d",
      level: "error",
    }),
  ],
});

export default logger;
