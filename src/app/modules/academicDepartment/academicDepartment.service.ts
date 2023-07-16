import httpStatus from "http-status";
import {
  getAndSearchFilter,
  getOrSearchFilter,
} from "../../../helpers/filters";
import { IPaginationOptions } from "../../../interface/service";
import ApiError from "../../../utils/errors/ApiError";
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from "./academicDepartment.interface";
import AcademicFaculty from "./academicDepartment.model";

type GetAllResponse = {
  data: IAcademicDepartment[];
  totalDocuments: number;
  totalPages: number;
  page: number;
  limit: number;
  searchResult: number;
};

// Create a new Academic Department
export const createAcademicDepartmentService = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await AcademicFaculty.create(payload)).populate(
    "academicFaculty"
  );

  return result;
};

// Get All Academic Department with Pagination & Filters
export const getAllAcademicDepartmentService = async (
  paginationOptions: IPaginationOptions,
  filters: IAcademicDepartmentFilters
): Promise<GetAllResponse> => {
  const { page, limit, sortBy, sortOrder, skip } = paginationOptions;
  const { search, ...others } = filters;
  const searchableFields = ["title"];
  const orSearchFilter = getOrSearchFilter(search, searchableFields);
  const andSearchFilter = getAndSearchFilter(others);

  const query = { ...orSearchFilter, ...andSearchFilter };

  const result = await AcademicFaculty.aggregate([
    {
      $facet: {
        data: [
          { $match: query },
          {
            $project: {
              title: 1,
              createdAt: 1,
              updatedAt: 1,
            },
          },
          { $sort: { [sortBy]: sortOrder } },
          { $skip: skip },
          { $limit: limit },
        ],
        searchResult: [
          { $match: query },
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
      $unwind: "$searchResult",
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
    totalPages: Math.ceil(result[0].searchResult / limit),
    page,
    limit,
  };
};

// Get Academic Department By Id
export const getAcademicDepartmentService = async (
  id: string
): Promise<IAcademicDepartment> => {
  const result = await AcademicFaculty.findById(id).populate("academicFaculty");

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Department Not Found");
  }

  return result;
};

// Update Academic Department By Id
export const updateAcademicDepartmentService = async (
  id: string,
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate("academicFaculty");

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Department Not Found");
  }

  return result;
};

// Delete Academic Department By Id
export const deleteAcademicDepartmentService = async (
  id: string
): Promise<IAcademicDepartment> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Department Not Found");
  }

  return result;
};
