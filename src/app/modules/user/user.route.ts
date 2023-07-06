import express from "express";
import { createUser } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { createUserZodSchema } from "./user.validation";

const router = express.Router();

router.post("/create", validateRequest(createUserZodSchema), createUser);

export default router;
