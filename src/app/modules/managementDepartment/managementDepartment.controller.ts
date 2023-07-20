import httpStatus from "http-status";
import { IQueryParams } from "../../../interface/common";
import asyncHandler from "../../../utils/errors/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { IManagementDepartment } from "./managementDepartment.interface";
import {
  createManagementDepartmentService,
  deleteManagementDepartmentService,
  getAllManagementDepartmentService,
  getManagementDepartmentByIdService,
  updateManagementDepartmentService,
} from "./managementDepartment.service";

// Create new ManagementDepartment
export const createManagementDepartment = asyncHandler(async (req, res) => {
  const { ...data } = req.body;
  const result = await createManagementDepartmentService(data);

  sendResponse<IManagementDepartment>(res, {
    statusCode: 201,
    success: true,
    message: "Management Department created successfully",
    data: result,
  });
});

// Get all management Departments
export const getAllManagementDepartments = asyncHandler(async (req, res) => {
  const { data, totalDocuments, totalResult, totalPages, page, limit } =
    await getAllManagementDepartmentService(req.queryParams as IQueryParams);

  sendResponse<IManagementDepartment[]>(res, {
    statusCode: 200,
    success: true,
    message: "Management Departments fetched successfully",
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

// Get ManagementDepartment by ID
export const getManagementDepartmentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await getManagementDepartmentByIdService(id);

  sendResponse<IManagementDepartment>(res, {
    statusCode: 200,
    success: true,
    message: "Management Department retrieved successfully",
    data: result || ({} as IManagementDepartment),
  });
});

// Update ManagementDepartment by ID
export const updateManagementDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const result = await updateManagementDepartmentService(id, data);

  sendResponse<IManagementDepartment>(res, {
    statusCode: 200,
    success: true,
    message: "Faculty updated successfully",
    data: result,
  });
});

// Delete ManagementDepartment by ID
export const deleteManagementDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteManagementDepartmentService(id);

  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ManagementDepartment deleted successfully",
    data: result,
  });
});
