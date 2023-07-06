/* eslint-disable no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import config from "../../config";
import sendResponse from "./sendResponse";
import { RequestHandler } from "express-serve-static-core";

// create  error class for our custom errors
export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string | undefined, stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.stack = stack;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Global Error Handler
export const globalErrorHandler: ErrorRequestHandler = (
  err: ApiError,
  req,
  res,
  next
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong!";

  if (err?.name === "ValidationError") {
    err = new ApiError(400, "Invalid Input Data");
  }

  sendResponse(res, {
    statusCode: err.statusCode,
    success: false,
    message: err.message,
    stack: config.isDevelopment ? err.stack : undefined,
  });
};

// Catch Async Errors
type IFunction = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<void>;

export const asyncHandler = (fn: IFunction): RequestHandler => {
  return (req: Request, res: Response, next?: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
