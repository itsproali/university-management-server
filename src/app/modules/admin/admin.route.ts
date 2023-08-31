import express from "express";
import queryParams from "../../middleware/queryParams";
import validateRequest from "../../middleware/validateRequest";
import {
  deleteAdmin,
  getAdminById,
  getAllAdmin,
  updateAdmin,
} from "./admin.controller";
import { updateAdminZodSchema } from "./admin.validation";

const router = express.Router();

router.get("/", queryParams, getAllAdmin);

router.get("/:id", getAdminById);

router.patch("/:id", validateRequest(updateAdminZodSchema), updateAdmin);

router.delete("/:id", deleteAdmin);

export const adminRouter = router;
