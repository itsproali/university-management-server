import express from "express";
import validateRequest from "../../middleware/validateRequest";
import {
  changePasswordZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
} from "./auth.validation";
import {
  changePassword,
  loginUser,
  refreshAccessToken,
} from "./auth.controller";
import authGuard from "../../middleware/authGuard";
const router = express.Router();

router.post("/login", validateRequest(loginZodSchema), loginUser);

router.post(
  "/refresh-token",
  validateRequest(refreshTokenZodSchema),
  refreshAccessToken
);

router.post(
  "/change-password",
  validateRequest(changePasswordZodSchema),
  authGuard(),
  changePassword
);

export const authRouter = router;
