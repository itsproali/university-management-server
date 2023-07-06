import express from "express";
import validateRequest from "../../middleware/validateRequest";
import createAcademicSemesterZodSchema from "./academicSemester.validation";
import { createSemester } from "./academicSemester.controller";
const router = express.Router();

router.post(
  "/create",
  validateRequest(createAcademicSemesterZodSchema),
  createSemester
);

export const academicSemesterRouter = router;
