import express from "express";
import queryParams from "../../middleware/queryParams";
import validateRequest from "../../middleware/validateRequest";
import {
  deleteFaculty,
  getAllFaculties,
  getFacultyById,
  updateFaculty,
} from "./faculty.controller";
import { updateFacultyZodSchema } from "./faculty.validation";

const router = express.Router();

router.get("/all", queryParams, getAllFaculties);

router.get("/:id", getFacultyById);

router.patch("/:id", validateRequest(updateFacultyZodSchema), updateFaculty);

router.delete("/:id", deleteFaculty);

export const facultyRouter = router;
