import express from "express";
import validateRequest from "../../middleware/validateRequest";
import createAcademicSemesterZodSchema from "./academicSemester.validation";
import { createSemester, getAllSemester } from "./academicSemester.controller";
const router = express.Router();

router.post(
  "/create",
  validateRequest(createAcademicSemesterZodSchema),
  createSemester
);
router.get("/all", getAllSemester);

export const academicSemesterRouter = router;
