import { getPagination } from "../../../helpers/paginationHelper";
import asyncHandler from "../../../utils/errors/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { IAcademicSemester } from "./academicSemester.interface";
import {
  createSemesterService,
  getAllSemesterService,
} from "./academicSemester.service";

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

export const getAllSemester = asyncHandler(async (req, res) => {
  const options = getPagination(req.query);

  const { data, totalDocuments, totalPages, page, limit } =
    await getAllSemesterService(options);

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: 200,
    success: true,
    message: "Semester retrieved successfully",
    meta: {
      total: totalDocuments,
      totalPages,
      currentPage: page,
      limit,
    },
    data,
  });
});
