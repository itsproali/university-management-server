/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import getAggregationStages from "../../../helpers/getAggregationStages";
import { IQueryParams, IServiceResponse } from "../../../interface/common";
import ApiError from "../../../utils/errors/ApiError";
import { IManagementDepartment } from "./managementDepartment.interface";
import { ManagementDepartment } from "./managementDepartment.model";

// Create new ManagementDepartment service
export const createManagementDepartmentService = async (
  data: Partial<IManagementDepartment>
): Promise<IManagementDepartment> => {
  const result = await ManagementDepartment.create(data);
  return result;
};

// Get all ManagementDepartment service
export const getAllManagementDepartmentService = async (
  params: IQueryParams
): Promise<IServiceResponse<IManagementDepartment[]>> => {
  const { page, limit } = params;
  const stages = getAggregationStages(params, ["title"]);

  const result = await ManagementDepartment.aggregate([...stages]);

  return {
    ...result[0],
    totalPages: Math.ceil(result[0].totalResult / limit),
    page,
    limit,
  };
};

// Get Management Department by id service
export const getManagementDepartmentByIdService = async (
  id: string
): Promise<IManagementDepartment> => {
  const result = await ManagementDepartment.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Management Department not found");
  }
  return result;
};

// Update ManagementDepartment by id service
export const updateManagementDepartmentService = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  // !---- We can't use findByIdAndUpdate here because it doesn't trigger the pre save hook/method ----!
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Management Department not found");
  }
  return result;
};

// Delete ManagementDepartment by ID
export const deleteManagementDepartmentService = async (
  id: string
): Promise<IManagementDepartment> => {
  const result = await ManagementDepartment.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Management Department not found");
  }
  return result;
};
