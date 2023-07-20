import httpStatus from "http-status";
import { IQueryParams } from "../../../interface/common";
import ApiError from "../../../utils/errors/ApiError";
import asyncHandler from "../../../utils/errors/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { IStudent } from "./student.interface";
import {
  deleteStudentService,
  getAllStudentsService,
  getStudentByIdService,
  updateStudentService,
} from "./student.service";

// Get all students
export const getAllStudents = asyncHandler(async (req, res) => {
  const { data, totalDocuments, totalResult, totalPages, page, limit } =
    await getAllStudentsService(req.queryParams as IQueryParams);

  sendResponse<IStudent[]>(res, {
    statusCode: 200,
    success: true,
    message: "Students fetched successfully",
    meta: {
      currentPage: page,
      total: totalDocuments,
      limit,
      totalResult,
      totalPages,
    },
    data,
  });
});

// Get Student by ID
export const getStudentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await getStudentByIdService(id);

  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: "Student retrieved successfully",
    data: result || ({} as IStudent),
  });
});

// Update Student by ID
export const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const result = await updateStudentService(id, data);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
  }

  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: "Student updated successfully",
    data: result,
  });
});

// Delete Student by ID
export const deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteStudentService(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
  }

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student deleted successfully",
    data: result,
  });
});
