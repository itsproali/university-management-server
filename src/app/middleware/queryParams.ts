import { RequestHandler } from "express";

const queryParams: RequestHandler = (req, res, next) => {
  const page: number = parseInt(req.query.page as string);
  const limit: number = parseInt(req.query.limit as string);
  const search: string = String(req.query.search) || "";
  const sortBy: string = String(req.query.sortBy) || "createdAt";
  const sortOrder: 1 | -1 =
    String(req.query.sortOrder) === "asc" ? 1 : -1 || -1;

  const query: object = req.query;
  const filters: { [key: string]: number | string | boolean } = {
    ...query,
  };

  const excludedFields = ["page", "sort", "limit", "fields", "search"];

  excludedFields.forEach((el) => delete filters[el]);

  Object.keys(filters).forEach((key) => {
    if (filters[key] === "true") {
      filters[key] = true;
    } else if (filters[key] === "false") {
      filters[key] = false;
    }
  });

  const modifiedQueries = {
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    filters,
  };

  req.queryParams = modifiedQueries;

  next();
};
export default queryParams;
