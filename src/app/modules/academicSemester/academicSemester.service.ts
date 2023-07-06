import ApiError from "../../../utils/errors/ApiError";
import { IAcademicSemester } from "./academicSemester.interface";
import AcademicSemester from "./academicSemester.model";
import { semesterTitleCodeMap } from "./academicSemester.utils";
import httpStatus from "http-status";

export const createSemesterService = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (semesterTitleCodeMap[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid semester code");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};
