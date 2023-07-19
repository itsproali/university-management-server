import express from "express";
import {
  createAdminUser,
  createFacultyUser,
  createStudentUser,
} from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import {
  createAdminZodSchema,
  createFacultyZodSchema,
  createStudentZodSchema,
} from "./user.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(createStudentZodSchema),
  createStudentUser
);

router.post(
  "/create-faculty",
  validateRequest(createFacultyZodSchema),
  createFacultyUser
);

router.post(
  "/create-admin",
  validateRequest(createAdminZodSchema),
  createAdminUser
);

export const userRouter = router;
