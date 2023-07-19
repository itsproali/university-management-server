import asyncHandler from "../../../utils/errors/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import {
  createAdminService,
  createFacultyService,
  createStudentService,
} from "./user.service";

// Create a New Student User
export const createStudentUser = asyncHandler(async (req, res) => {
  const { student, ...userData } = req.body;

  const result = await createStudentService(student, userData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Created Successfully",
    data: result,
  });
});

// Create a new Faculty User
export const createFacultyUser = asyncHandler(async (req, res) => {
  const { faculty, ...userData } = req.body;

  const result = await createFacultyService(faculty, userData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Created Successfully",
    data: result,
  });
});

// Create an Admin User
export const createAdminUser = asyncHandler(async (req, res) => {
  const { admin, ...userData } = req.body;

  const result = await createAdminService(admin, userData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Created Successfully",
    data: result,
  });
});
