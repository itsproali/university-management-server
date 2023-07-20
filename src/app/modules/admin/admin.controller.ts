import httpStatus from "http-status";
import { IQueryParams } from "../../../interface/common";
import ApiError from "../../../utils/errors/ApiError";
import asyncHandler from "../../../utils/errors/asyncHandler";
import sendResponse from "../../../utils/sendResponse";

import {
  deleteAdminService,
  getAllAdminService,
  getAdminByIdService,
  updateAdminService,
} from "./admin.service";
import { IAdmin } from "./admin.interface";

// Get all faculties
export const getAllAdmin = asyncHandler(async (req, res) => {
  const { data, totalDocuments, totalResult, totalPages, page, limit } =
    await getAllAdminService(req.queryParams as IQueryParams);

  sendResponse<IAdmin[]>(res, {
    statusCode: 200,
    success: true,
    message: "Admin fetched successfully",
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

// Get Admin by ID
export const getAdminById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await getAdminByIdService(id);

  sendResponse<IAdmin>(res, {
    statusCode: 200,
    success: true,
    message: "Admin retrieved successfully",
    data: result || ({} as IAdmin),
  });
});

// Update Admin by ID
export const updateAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const result = await updateAdminService(id, data);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  }

  sendResponse<IAdmin>(res, {
    statusCode: 200,
    success: true,
    message: "Admin updated successfully",
    data: result,
  });
});

// Delete Admin by ID
export const deleteAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteAdminService(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  }

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});
