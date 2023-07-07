import { IPaginationOptions } from "../../../interface/service";
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

export const getAllSemesterService = async (
  options: IPaginationOptions
): Promise<{
  data: IAcademicSemester[];
  totalDocuments: number;
  totalPages: number;
}> => {
  const { page, limit, sortBy, sortOrder } = options;
  const result = await AcademicSemester.aggregate([
    {
      $facet: {
        data: [
          {
            $project: {
              _id: 1,
              title: 1,
              year: 1,
              code: 1,
              startMonth: 1,
              endMonth: 1,
              createdAt: 1,
              updatedAt: 1,
            },
          },
          {
            $sort: {
              [sortBy]: sortOrder,
            },
          },
          {
            $skip: (page - 1) * limit,
          },
          { $limit: limit },
        ],
        totalDocuments: [
          {
            $count: "total",
          },
        ],
      },
    },
    {
      $unwind: "$totalDocuments",
    },
    {
      $project: {
        data: 1,
        totalDocuments: "$totalDocuments.total",
      },
    },
  ]);

  return {
    ...result[0],
    totalPages: Math.ceil(result[0].totalDocuments / limit),
  };
};
