import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import sendResponse from "../sendResponse";
import config from "../../../config";

// Global Error Handler
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";

  if (err?.name === "ValidationError") {
    statusCode = 400;
    message = "Invalid Input Data";
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = err.errors[0].message;
  }

  sendResponse(res, {
    statusCode,
    success: false,
    message,
    stack: config.isDevelopment ? err.stack : undefined,
  });
};

export default globalErrorHandler;
