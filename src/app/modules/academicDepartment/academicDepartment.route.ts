import express from "express";
import {
  createAcademicDepartment,
  deleteAcademicDepartment,
  getAcademicDepartment,
  getAllAcademicDepartment,
  updateAcademicDepartment,
} from "./academicDepartment.controller";
import validateRequest from "../../middleware/validateRequest";
import { createAcademicDepartmentZodSchema } from "./academicDepartment.validation";
const router = express.Router();

router.post(
  "/",
  validateRequest(createAcademicDepartmentZodSchema),
  createAcademicDepartment
);

router.get("/", getAllAcademicDepartment);

router.get("/:id", getAcademicDepartment);

router.patch(
  "/:id",
  validateRequest(createAcademicDepartmentZodSchema),
  updateAcademicDepartment
);

router.delete("/:id", deleteAcademicDepartment);

export const academicDepartmentRouter = router;
