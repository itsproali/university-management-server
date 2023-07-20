/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import getAggregationStages from "../../../helpers/getAggregationStages";
import { IQueryParams, IServiceResponse } from "../../../interface/common";
import ApiError from "../../../utils/errors/ApiError";
import { IFaculty } from "./faculty.interface";
import Faculty from "./faculty.model";

// Get all Faculties service
export const getAllFacultiesService = async (
  params: IQueryParams
): Promise<IServiceResponse<IFaculty[]>> => {
  const { page, limit } = params;
  const stages = getAggregationStages(params, [
    "id",
    "bloodGroup",
    "email",
    "contactNo",
    "name.firstName",
    "name.lastName",
  ]);

  const result = await Faculty.aggregate([...stages]);

  return {
    ...result[0],
    totalPages: Math.ceil(result[0].totalResult / limit),
    page,
    limit,
  };
};

// Get Faculty by id service
export const getFacultyByIdService = async (id: string): Promise<IFaculty> => {
  const result = await Faculty.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Faculty not found");
  }
  return result;
};

// Update Faculty by id service
export const updateFacultyService = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const faculty = await Faculty.findOne({ _id: id });

  if (!faculty) {
    throw new ApiError(httpStatus.NOT_FOUND, "Faculty not found");
  }

  const { name, ...facultyData } = payload;

  const updatedFacultyData: Partial<IFaculty> = { ...facultyData };

  if (name && Object.keys(name).length) {
    Object.keys(name).forEach((key) => {
      (updatedFacultyData as any)[`name.${key}`] =
        name[key as keyof typeof name];
    });
  }

  // !---- We can't use findByIdAndUpdate here because it doesn't trigger the pre save hook/method ----!
  const result = await Faculty.findOneAndUpdate(
    { _id: id },
    updatedFacultyData,
    {
      new: true,
    }
  );

  return result;
};

// Delete Faculty by ID
export const deleteFacultyService = async (id: string): Promise<IFaculty> => {
  const result = await Faculty.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Faculty not found");
  }
  return result;
};
