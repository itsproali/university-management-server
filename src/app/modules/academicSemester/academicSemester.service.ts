import httpStatus from "http-status";
import getAggregationStages from "../../../helpers/getAggregationStages";
import { IQueryParams, IServiceResponse } from "../../../interface/common";
import ApiError from "../../../utils/errors/ApiError";
import { IAcademicSemester } from "./academicSemester.interface";
import AcademicSemester from "./academicSemester.model";
import { semesterTitleCodeMap } from "./academicSemester.utils";

// Create Semester
export const createSemesterService = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (semesterTitleCodeMap[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid semester code");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

// get all semesters
export const getAllSemesterService = async (
  params: IQueryParams
): Promise<IServiceResponse<IAcademicSemester[]>> => {
  const { page, limit } = params;
  const stages = getAggregationStages(params, ["title", "code", "year"]);

  const result = await AcademicSemester.aggregate([...stages]);

  return {
    ...result[0],
    totalPages: Math.ceil(result[0]?.totalResult / limit),
    page,
    limit,
  };
};

// Get Semester by ID
export const getSemesterByIdService = async (
  id: string
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Semester not found");
  }
  return result;
};

// Update Semester by ID
export const updateSemesterService = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester> => {
  if (
    payload?.title &&
    payload?.code &&
    semesterTitleCodeMap[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid semester code");
  }

  // !---- We can't use findByIdAndUpdate here because it doesn't trigger the pre save hook/method ----!
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Semester not found");
  }

  await result.save();

  return result;
};

// Delete Semester by ID
export const deleteSemesterService = async (
  id: string
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Semester not found");
  }
  return result;
};
