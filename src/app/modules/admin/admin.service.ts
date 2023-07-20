/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import getAggregationStages from "../../../helpers/getAggregationStages";
import { IQueryParams, IServiceResponse } from "../../../interface/common";
import ApiError from "../../../utils/errors/ApiError";
import { IAdmin } from "./admin.interface";
import Admin from "./admin.model";

// Get all Admin service
export const getAllAdminService = async (
  params: IQueryParams
): Promise<IServiceResponse<IAdmin[]>> => {
  const { page, limit } = params;
  const stages = getAggregationStages(params, [
    "id",
    "bloodGroup",
    "email",
    "contactNo",
    "name.firstName",
    "name.lastName",
  ]);

  const result = await Admin.aggregate([...stages]);

  return {
    ...result[0],
    totalPages: Math.ceil(result[0].totalResult / limit),
    page,
    limit,
  };
};

// Get Admin by id service
export const getAdminByIdService = async (id: string): Promise<IAdmin> => {
  const result = await Admin.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  }
  return result;
};

// Update Admin by id service
export const updateAdminService = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const faculty = await Admin.findOne({ _id: id });

  if (!faculty) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  }

  const { name, ...adminData } = payload;

  const updatedAdminData: Partial<IAdmin> = { ...adminData };

  if (name && Object.keys(name).length) {
    Object.keys(name).forEach((key) => {
      (updatedAdminData as any)[`name.${key}`] = name[key as keyof typeof name];
    });
  }

  // !---- We can't use findByIdAndUpdate here because it doesn't trigger the pre save hook/method ----!
  const result = await Admin.findOneAndUpdate({ _id: id }, updatedAdminData, {
    new: true,
  });

  return result;
};

// Delete Admin by ID
export const deleteAdminService = async (id: string): Promise<IAdmin> => {
  const result = await Admin.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  }
  return result;
};
