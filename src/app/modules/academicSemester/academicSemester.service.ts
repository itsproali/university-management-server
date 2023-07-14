import httpStatus from "http-status";
import { IPaginationOptions } from "../../../interface/service";
import ApiError from "../../../utils/errors/ApiError";
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
} from "./academicSemester.interface";
import AcademicSemester from "./academicSemester.model";
import { semesterTitleCodeMap } from "./academicSemester.utils";
import {
  getAndSearchFilter,
  getOrSearchFilter,
} from "../../../helpers/filters";

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

// Get All Semester with pagination & Filters
export const getAllSemesterService = async (
  options: IPaginationOptions,
  filters: IAcademicSemesterFilter
): Promise<{
  data: IAcademicSemester[];
  totalDocuments: number;
  totalPages: number;
  page: number;
  limit: number;
  searchResult: number;
}> => {
  const { page, limit, skip, sortBy, sortOrder } = options;
  const { search, ...others } = filters;

  const searchableFields = ["title", "code", "year"];
  const orSearchFilter = getOrSearchFilter(search, searchableFields);
  const andSearchFilter = getAndSearchFilter(others);

  const result = await AcademicSemester.aggregate([
    {
      $facet: {
        data: [
          {
            $match: { ...orSearchFilter, ...andSearchFilter },
          },
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
            $skip: skip,
          },
          { $limit: limit },
        ],
        searchResult: [
          { $match: { ...orSearchFilter, ...andSearchFilter } },
          {
            $count: "total",
          },
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
        searchResult: "$searchResult.total",
      },
    },
  ]);

  return {
    ...result[0],
    totalPages: Math.ceil(result[0].totalDocuments / limit),
    page,
    limit,
    searchResult: result[0].searchResult[0],
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
