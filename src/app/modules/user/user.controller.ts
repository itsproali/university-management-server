import asyncHandler from "../../../utils/errors/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { createStudentService } from "./user.service";

// Create a New User
export const createUser = asyncHandler(async (req, res) => {
  const { student, ...userData } = req.body;

  const result = await createStudentService(student, userData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Created Successfully",
    data: result,
  });
});
