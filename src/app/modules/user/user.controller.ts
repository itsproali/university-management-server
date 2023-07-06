import asyncHandler from "../../utils/errors/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { createUserService } from "./user.service";

// Create a New User
export const createUser = asyncHandler(async (req, res) => {
  const result = await createUserService(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Created Successfully",
    data: result,
  });
});
