import cors from "cors";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
const app: Application = express();

import routers from "./app/routes/index";
import globalErrorHandler from "./utils/errors/globalErrorHandler";
import sendResponse from "./utils/sendResponse";

// Setup Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());
app.use(morgan("dev"));

// Default route
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to the University Management System Auth Service API!");
});

// Routes
app.use("/api/v1", routers);

// Global Error Handler
app.use(globalErrorHandler);

// 404 Error handler
app.all("*", (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: 404,
    success: false,
    message: "Resource not found",
    errorMessages: [
      {
        path: req.path,
        message: "Resource not found",
      },
    ],
  });
});

export default app;
