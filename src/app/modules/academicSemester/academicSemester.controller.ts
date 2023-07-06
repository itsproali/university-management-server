import asyncHandler from "../../../utils/errors/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { createSemesterService } from "./academicSemester.service";

export const createSemester = asyncHandler(async (req, res) => {
  const { ...data } = req.body;
  const result = await createSemesterService(data);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Semester created successfully",
    data: result,
  });
});
