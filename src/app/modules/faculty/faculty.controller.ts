import httpStatus from "http-status";
import { IQueryParams } from "../../../interface/common";
import ApiError from "../../../utils/errors/ApiError";
import asyncHandler from "../../../utils/errors/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { IFaculty } from "./faculty.interface";
import {
  deleteFacultyService,
  getAllFacultiesService,
  getFacultyByIdService,
  updateFacultyService,
} from "./faculty.service";

// Get all faculties
export const getAllFaculties = asyncHandler(async (req, res) => {
  const { data, totalDocuments, totalResult, totalPages, page, limit } =
    await getAllFacultiesService(req.queryParams as IQueryParams);

  sendResponse<IFaculty[]>(res, {
    statusCode: 200,
    success: true,
    message: "Faculties fetched successfully",
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

// Get Faculty by ID
export const getFacultyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await getFacultyByIdService(id);

  sendResponse<IFaculty>(res, {
    statusCode: 200,
    success: true,
    message: "Faculty retrieved successfully",
    data: result || ({} as IFaculty),
  });
});

// Update Faculty by ID
export const updateFaculty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const result = await updateFacultyService(id, data);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Faculty not found");
  }

  sendResponse<IFaculty>(res, {
    statusCode: 200,
    success: true,
    message: "Faculty updated successfully",
    data: result,
  });
});

// Delete Faculty by ID
export const deleteFaculty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteFacultyService(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Faculty not found");
  }

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty deleted successfully",
    data: result,
  });
});
