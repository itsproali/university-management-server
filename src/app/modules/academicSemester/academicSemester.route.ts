import express from "express";
import validateRequest from "../../middleware/validateRequest";
import {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
} from "./academicSemester.validation";
import {
  createSemester,
  deleteSemester,
  getAllSemester,
  getSemesterById,
  updateSemester,
} from "./academicSemester.controller";
const router = express.Router();

router.post(
  "/create",
  validateRequest(createAcademicSemesterZodSchema),
  createSemester
);
router.get("/all", getAllSemester);

router.get("/:id", getSemesterById);

router.patch(
  "/:id",
  validateRequest(updateAcademicSemesterZodSchema),
  updateSemester
);

router.delete("/:id", deleteSemester);

export const academicSemesterRouter = router;
