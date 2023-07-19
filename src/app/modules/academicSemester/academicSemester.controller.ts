import httpStatus from "http-status";
import { getPagination } from "../../../helpers/paginationHelper";
import pick from "../../../helpers/pick";
import ApiError from "../../../utils/errors/ApiError";
import asyncHandler from "../../../utils/errors/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { IAcademicSemester } from "./academicSemester.interface";
import {
  createSemesterService,
  deleteSemesterService,
  getAllSemesterService,
  getSemesterByIdService,
  updateSemesterService,
} from "./academicSemester.service";
import { IQueryParams } from "../../../interface/common";

// Create Semester
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

// Get All Semester with pagination & Filters
export const getAllSemester = asyncHandler(async (req, res) => {
  // const options = getPagination(req.query);
  // const filters = pick(req.query, ["search", "title", "code", "year"]);

  const { data, totalDocuments, totalPages, page, limit, totalResult } =
    await getAllSemesterService(req.queryParams as IQueryParams);

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: 200,
    success: true,
    message: "Semester retrieved successfully",
    meta: {
      total: totalDocuments,
      totalPages,
      currentPage: page,
      limit,
      totalResult,
    },
    data,
  });
});

// Get Semester by ID
export const getSemesterById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await getSemesterByIdService(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: "Semester retrieved successfully",
    data: result || ({} as IAcademicSemester),
  });
});

// Update Semester by ID
export const updateSemester = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const result = await updateSemesterService(id, data);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Semester not found");
  }

  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: "Semester updated successfully",
    data: result,
  });
});

// Delete Semester by ID
export const deleteSemester = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteSemesterService(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Semester not found");
  }

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester deleted successfully",
    data: result,
  });
});
