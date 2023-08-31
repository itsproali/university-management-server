import express from "express";
import queryParams from "../../middleware/queryParams";
import validateRequest from "../../middleware/validateRequest";
import {
  createManagementDepartment,
  deleteManagementDepartment,
  getAllManagementDepartments,
  getManagementDepartmentById,
  updateManagementDepartment,
} from "./managementDepartment.controller";
import {
  createManagementDepartmentZodSchema,
  updateManagementDepartmentZodSchema,
} from "./managementDepartment.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(createManagementDepartmentZodSchema),
  createManagementDepartment
);

router.get("/", queryParams, getAllManagementDepartments);

router.get("/:id", getManagementDepartmentById);

router.patch(
  "/:id",
  validateRequest(updateManagementDepartmentZodSchema),
  updateManagementDepartment
);

router.delete("/:id", deleteManagementDepartment);

export const managementDepartmentRouter = router;
