import express from "express";
import {
  createAcademicFaculty,
  deleteAcademicFaculty,
  getAcademicFaculty,
  getAllAcademicFaculty,
  updateAcademicFaculty,
} from "./academicFaculty.controller";
import validateRequest from "../../middleware/validateRequest";
import { createAcademicFacultyZodSchema } from "./academicFaculty.validation";
const router = express.Router();

router.post(
  "/create",
  validateRequest(createAcademicFacultyZodSchema),
  createAcademicFaculty
);

router.get("/all", getAllAcademicFaculty);

router.get("/:id", getAcademicFaculty);

router.patch(
  "/:id",
  validateRequest(createAcademicFacultyZodSchema),
  updateAcademicFaculty
);

router.delete("/:id", deleteAcademicFaculty);

export const academicFacultyRouter = router;
