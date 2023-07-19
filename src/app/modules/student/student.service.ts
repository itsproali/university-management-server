import getAggregationStages from "../../../helpers/getAggregationStages";
import { IQueryParams, IServiceResponse } from "../../../interface/common";
import { IStudent } from "./student.interface";
import Student from "./student.model";

// Get all Students service
export const getAllStudentsService = async (
  params: IQueryParams
): Promise<IServiceResponse<IStudent[]>> => {
  const { page, limit } = params;
  const stages = getAggregationStages(params, ["email", "phoneNo"]);

  const result = await Student.aggregate([...stages]);

  return {
    ...result[0],
    totalPages: Math.ceil(result[0].totalResult / limit),
    page,
    limit,
  };
};
