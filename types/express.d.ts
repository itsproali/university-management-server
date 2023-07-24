import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { IQueryParams } from "../src/interface/common";

declare global {
  namespace Express {
    export interface Request {
      queryParams: Partial<IQueryParams>;
      user: JwtPayload;
    }
  }
}
