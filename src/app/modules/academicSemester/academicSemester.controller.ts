import asyncHandler from "../../../utils/errors/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import {
  createSemesterService,
  getAllSemesterService,
} from "./academicSemester.service";

export const createSemester = asyncHandler(async (req, res) => {
  const { ...data } = req.body;
  const result = await createSemesterService(data);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Semester created successfully",
    data: result,
  });
});

export const getAllSemester = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const sortBy = (req.query.sortBy as string) || "createdAt";
  const sortOrder = (req.query.sortOrder as string) === "asc" ? 1 : -1;

  const { data, totalDocuments, totalPages } = await getAllSemesterService({
    page,
    limit,
    sortBy,
    sortOrder,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Semester retrieved successfully",
    metaData: {
      total: totalDocuments,
      totalPages,
      currentPage: page,
      limit,
    },
    data,
  });
});
