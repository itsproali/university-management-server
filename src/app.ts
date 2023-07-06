import cors from "cors";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
const app: Application = express();

import routers from "./app/routes/index";
import sendResponse from "./utils/sendResponse";
import globalErrorHandler from "./utils/errors/globalErrorHandler";

// Setup Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// Default route
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to the University Management System API!");
});

// Routes
app.use("/api/v1", routers);

// 404 Error handler
app.all("*", (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: 404,
    success: false,
    message: "Resource not found",
  });
});

app.use(globalErrorHandler);

export default app;
