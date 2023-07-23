/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import getAggregationStages from "../../../helpers/getAggregationStages";
import { IQueryParams, IServiceResponse } from "../../../interface/common";
import ApiError from "../../../utils/errors/ApiError";
import { IStudent } from "./student.interface";
import Student from "./student.model";

// Get all Students service
export const getAllStudentsService = async (
  params: IQueryParams
): Promise<IServiceResponse<IStudent[]>> => {
  const { page, limit } = params;
  const stages = getAggregationStages(params, [
    "id",
    "bloodGroup",
    "email",
    "contactNo",
    "name.firstName",
    "name.lastName",
  ]);

  const result = await Student.aggregate([...stages]);

  return {
    ...result[0],
    totalPages: Math.ceil(result[0].totalResult / limit),
    page,
    limit,
  };
};

// Get Student by id service
export const getStudentByIdService = async (id: string): Promise<IStudent> => {
  const result = await Student.findOne({ id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
  }
  return result;
};

// Update Student by id service
export const updateStudentService = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const student = await Student.findOne({ _id: id });

  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
  }

  const { name, guardian, localGuardian, ...studentData } = payload;

  const updatedStudentData: Partial<IStudent> = { ...studentData };

  if (name && Object.keys(name).length) {
    Object.keys(name).forEach((key) => {
      (updatedStudentData as any)[`name.${key}`] =
        name[key as keyof typeof name];
    });
  }

  if (guardian && Object.keys(guardian).length) {
    Object.keys(guardian).forEach((key) => {
      (updatedStudentData as any)[`guardian.${key}`] =
        guardian[key as keyof typeof guardian];
    });
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    Object.keys(localGuardian).forEach((key) => {
      (updatedStudentData as any)[`localGuardian.${key}`] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  // !---- We can't use findByIdAndUpdate here because it doesn't trigger the pre save hook/method ----!
  const result = await Student.findOneAndUpdate(
    { _id: id },
    updatedStudentData,
    {
      new: true,
    }
  );

  return result;
};

// Delete Student by ID
export const deleteStudentService = async (id: string): Promise<IStudent> => {
  const result = await Student.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
  }
  return result;
};
