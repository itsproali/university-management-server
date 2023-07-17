import express from "express";
import { createUser as createStudent } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { createStudentZodSchema } from "./user.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(createStudentZodSchema),
  createStudent
);

export const userRouter = router;
