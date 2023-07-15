import httpStatus from "http-status";
import asyncHandler from "../../../utils/errors/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import {
  createAcademicFacultyService,
  deleteAcademicFacultyService,
  getAcademicFacultyService,
  getAllAcademicFacultyService,
  updateAcademicFacultyService,
} from "./academicFaculty.service";
import pick from "../../../helpers/pick";
import { paginationFields } from "../../../helpers/paginationFields";
import { getPagination } from "../../../helpers/paginationHelper";

// Create Academic Faculty
export const createAcademicFaculty = asyncHandler(async (req, res) => {
  const data = req.body;
  const result = await createAcademicFacultyService(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Faculty Created Successfully",
    data: result,
  });
});

// Get All Academic Faculty with Pagination and Filters
export const getAllAcademicFaculty = asyncHandler(async (req, res) => {
  const paginationOptions = getPagination(req.query);
  const filters = pick(req.query, ["search", "title"]);

  const { data, page, limit, totalDocuments, totalPages, searchResult } =
    await getAllAcademicFacultyService(paginationOptions, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty retrieved successfully",
    meta: {
      total: totalDocuments,
      searchResult,
      totalPages,
      currentPage: page,
      limit,
    },
    data,
  });
});

// Get Academic Faculty By Id
export const getAcademicFaculty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await getAcademicFacultyService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty retrieved successfully",
    data: result,
  });
});

// Update Academic Faculty By Id
export const updateAcademicFaculty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await updateAcademicFacultyService(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty updated successfully",
    data: result,
  });
});

// Delete Academic Faculty By Id
export const deleteAcademicFaculty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await deleteAcademicFacultyService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty deleted successfully",
  });
});
