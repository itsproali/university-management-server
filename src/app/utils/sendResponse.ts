import { Response } from "express";

interface IApiResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T | null;
  stack?: string;
  metaData?: {
    total?: number;
    totalPages?: number;
    currentPage?: number;
    limit?: number;
  };
}

type ApiResponseWithoutStatusCode<T> = Omit<IApiResponse<T>, "statusCode">;

const sendResponse = <T>(res: Response, resData: IApiResponse<T>): void => {
  const data: ApiResponseWithoutStatusCode<T> = {
    success: resData?.success || true,
    message: resData?.message || undefined,
    data: resData?.data || undefined,
    metaData: resData?.metaData || undefined,
    stack: resData?.stack || undefined,
  };

  res.status(resData.statusCode).json(data);
};

export default sendResponse;
