import { Request } from "express";

declare global {
  namespace Express {
    export interface Request {
      queryParams: Partial<{
        page: number;
        limit: number;
        search: string;
        sortBy: string;
        sortOrder: 1 | -1;
        filters: { [key: string]: number | string | boolean };
        fields?: { [key: string]: number };
      }>;
    }
  }
}
