import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();

// Setup Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get("/", (req: Request, res: any) => {
  res.send("Welcome to the University Management System API!");
});

export default app;
