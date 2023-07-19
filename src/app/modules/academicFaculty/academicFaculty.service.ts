import httpStatus from "http-status";
import {
  getAndSearchFilter,
  getOrSearchFilter,
} from "../../../helpers/filters";
import { IPaginationOptions } from "../../../interface/service";
import ApiError from "../../../utils/errors/ApiError";
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from "./academicFaculty.interface";
import AcademicFaculty from "./academicFaculty.model";
import { IQueryParams, IServiceResponse } from "../../../interface/common";
import getAggregationStages from "../../../helpers/getAggregationStages";

type GetAllResponse = {
  data: IAcademicFaculty[];
  totalDocuments: number;
  totalPages: number;
  page: number;
  limit: number;
  searchResult: number;
};

// Create a new Academic Faculty
export const createAcademicFacultyService = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);

  return result;
};

// Get All Academic Faculty with Pagination & Filters
export const getAllAcademicFacultyService = async (
  params: IQueryParams
): Promise<IServiceResponse<IAcademicFaculty[]>> => {
  const { page, limit } = params;
  const stages = getAggregationStages(params, ["title"]);

  const result = await AcademicFaculty.aggregate([...stages]);

  return {
    ...result[0],
    totalPages: Math.ceil(result[0]?.totalResult / limit),
    page,
    limit,
  };
};

// Get Academic Faculty By Id
export const getAcademicFacultyService = async (
  id: string
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.findById(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Faculty Not Found");
  }

  return result;
};

// Update Academic Faculty By Id
export const updateAcademicFacultyService = async (
  id: string,
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Faculty Not Found");
  }

  return result;
};

// Delete Academic Faculty By Id
export const deleteAcademicFacultyService = async (
  id: string
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Faculty Not Found");
  }

  return result;
};
