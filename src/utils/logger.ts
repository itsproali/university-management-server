import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, colorize, prettyPrint } = format;

const myFormat = printf(({ level, message }) => {
  const date = new Date().toLocaleDateString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return `${level}: ${message} ${date}`;
});

const logger = createLogger({
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
    new transports.File({ filename: "logs/info.log", level: "info" }),
    new transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});

export default logger;
