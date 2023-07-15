import express from "express";
import { userRouter } from "../modules/user/user.route";
import { academicSemesterRouter } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRouter } from "../modules/academicFaculty/academicFaculty.route";
const router = express.Router();

router.use("/user", userRouter);
router.use("/academic-semester", academicSemesterRouter);
router.use("/academic-faculty", academicFacultyRouter);

export default router;
