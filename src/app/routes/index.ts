import express from "express";
import { userRouter } from "../modules/user/user.route";
import { academicSemesterRouter } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRouter } from "../modules/academicFaculty/academicFaculty.route";
import { academicDepartmentRouter } from "../modules/academicDepartment/academicDepartment.route";
import { studentRouter } from "../modules/student/student.route";
import { facultyRouter } from "../modules/faculty/faculty.route";
import { managementDepartmentRouter } from "../modules/managementDepartment/managementDepartment.route";
const router = express.Router();

router.use("/user", userRouter);
router.use("/academic-semester", academicSemesterRouter);
router.use("/academic-faculty", academicFacultyRouter);
router.use("/academic-department", academicDepartmentRouter);
router.use("/student", studentRouter);
router.use("/faculty", facultyRouter);
router.use("/management-department", managementDepartmentRouter);

export default router;
