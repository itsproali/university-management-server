import httpStatus from "http-status";
import { getPagination } from "../../../helpers/paginationHelper";
import pick from "../../../helpers/pick";
import asyncHandler from "../../../utils/errors/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import {
  createAcademicDepartmentService,
  deleteAcademicDepartmentService,
  getAcademicDepartmentService,
  getAllAcademicDepartmentService,
  updateAcademicDepartmentService,
} from "./academicDepartment.service";

// Create Academic Department
export const createAcademicDepartment = asyncHandler(async (req, res) => {
  const data = req.body;
  const result = await createAcademicDepartmentService(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Department Created Successfully",
    data: result,
  });
});

// Get All Academic Department with Pagination and Filters
export const getAllAcademicDepartment = asyncHandler(async (req, res) => {
  const paginationOptions = getPagination(req.query);
  const filters = pick(req.query, ["search", "title"]);

  const { data, page, limit, totalDocuments, totalPages, searchResult } =
    await getAllAcademicDepartmentService(paginationOptions, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Department retrieved successfully",
    meta: {
      total: totalDocuments,
      totalResult: searchResult,
      totalPages,
      currentPage: page,
      limit,
    },
    data,
  });
});

// Get Academic Department By Id
export const getAcademicDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await getAcademicDepartmentService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Department retrieved successfully",
    data: result,
  });
});

// Update Academic Department By Id
export const updateAcademicDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await updateAcademicDepartmentService(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Department updated successfully",
    data: result,
  });
});

// Delete Academic Department By Id
export const deleteAcademicDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await deleteAcademicDepartmentService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Department deleted successfully",
  });
});
