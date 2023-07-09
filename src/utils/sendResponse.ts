import { Response } from "express";

interface IApiResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string;
  errorMessages?: {
    path: string | number;
    message: string;
  }[];
  data?: T | null;
  stack?: string;
  meta?: {
    total?: number;
    totalPages?: number;
    currentPage?: number;
    limit?: number;
  };
}

type ApiResponseWithoutStatusCode<T> = Omit<IApiResponse<T>, "statusCode">;

const sendResponse = <T>(res: Response, resData: IApiResponse<T>): void => {
  const data: ApiResponseWithoutStatusCode<T> = {
    success: resData?.success,
    message: resData?.message || undefined,
    errorMessages: resData?.errorMessages || undefined,
    meta: resData?.meta || undefined,
    data: resData?.data || undefined,
    stack: resData?.stack || undefined,
  };

  res.status(resData.statusCode).json(data);
};

export default sendResponse;
