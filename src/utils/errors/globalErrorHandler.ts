import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import sendResponse from "../sendResponse";
import config from "../../config";
import { IGenericErrorMessage } from "../../interface/common";
import ApiError from "./ApiError";
import handleZodError from "./handleZodError";
import handleMongooseError from "./handleMongooseError";

// Global Error Handler
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";
  let errorMessages: IGenericErrorMessage[] = [];

  if (err?.name === "ValidationError") {
    const simplified = handleMongooseError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorMessages = simplified.errorMessages;
  } else if (err instanceof ZodError) {
    const simplified = handleZodError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorMessages = simplified.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = err?.message
      ? [
          {
            path: "",
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = err?.message
      ? [
          {
            path: "",
            message: err?.message,
          },
        ]
      : [];
  }

  sendResponse(res, {
    statusCode,
    success: false,
    message,
    errorMessages,
    stack: config.isDevelopment ? err.stack : undefined,
  });
};

export default globalErrorHandler;
