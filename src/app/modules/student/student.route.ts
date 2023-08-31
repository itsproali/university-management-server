import express from "express";
import queryParams from "../../middleware/queryParams";
import {
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "./student.controller";
import validateRequest from "../../middleware/validateRequest";
import { updateStudentZodSchema } from "./student.validation";
const router = express.Router();

router.get("/", queryParams, getAllStudents);

router.get("/:id", getStudentById);

router.patch("/:id", validateRequest(updateStudentZodSchema), updateStudent);

router.delete("/:id", deleteStudent);

export const studentRouter = router;
