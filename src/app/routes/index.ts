import express from "express";
import { userRouter } from "../modules/user/user.route";
import { academicSemesterRouter } from "../modules/academicSemester/academicSemester.route";
const router = express.Router();

router.use("/user", userRouter);
router.use("/academic-semester", academicSemesterRouter);

export default router;
