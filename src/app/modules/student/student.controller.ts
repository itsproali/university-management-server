import { IQueryParams } from "../../../interface/common";
import asyncHandler from "../../../utils/errors/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { IStudent } from "./student.interface";
import { getAllStudentsService } from "./student.service";

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
