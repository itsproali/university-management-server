import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { loginZodSchema, refreshTokenZodSchema } from "./auth.validation";
import { loginUser } from "./auth.controller";
const router = express.Router();

router.post("/login", validateRequest(loginZodSchema), loginUser);

router.post("/refresh-token", validateRequest(refreshTokenZodSchema));

export const authRouter = router;
