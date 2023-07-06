import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { ApiError } from "../utils/errorHandlers";
import logger from "../utils/logger";
const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      return next();
    } catch (error: any) {
      // next(error?.errors[0]);
      throw new ApiError(400, error?.errors[0]);
    }
  };

export default validateRequest;
