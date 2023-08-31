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
import queryParams from "../../middleware/queryParams";
import { ENUM_USER_ROLE } from "../../../enums/user.enum";
import authGuard from "../../middleware/authGuard";
const router = express.Router();

router.post(
  "/",
  validateRequest(createAcademicSemesterZodSchema),
  createSemester
);
router.get("/", authGuard(ENUM_USER_ROLE.STUDENT), queryParams, getAllSemester);

router.get("/:id", getSemesterById);

router.patch(
  "/:id",
  validateRequest(updateAcademicSemesterZodSchema),
  updateSemester
);

router.delete("/:id", deleteSemester);

export const academicSemesterRouter = router;
