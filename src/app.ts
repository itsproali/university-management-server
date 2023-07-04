import cors from "cors";
import express, { Application, Request, Response } from "express";
const app: Application = express();

import userRouter from "./app/modules/user/user.route";

// Setup Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/v1/user", userRouter);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the University Management System API!");
});

export default app;
