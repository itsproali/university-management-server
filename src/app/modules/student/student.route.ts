import express from "express";
import queryParams from "../../middleware/queryParams";
import { getAllStudents } from "./student.controller";
const router = express.Router();

router.get("/all", queryParams, getAllStudents);

export const studentRouter = router;
