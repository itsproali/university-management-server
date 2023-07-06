import cors from "cors";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
const app: Application = express();

import userRouter from "./app/modules/user/user.route";
import { globalErrorHandler } from "./app/utils/errorHandlers";

// Setup Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/user", userRouter);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to the University Management System API!");
});

app.use(globalErrorHandler);

export default app;
