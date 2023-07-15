import { PipelineStage } from "mongoose";

type IQueries = {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 1 | -1;
  filter: object;
  search?: string;
  fields: { [key: string]: number };
};

const getAggregationStages = (
  queries: IQueries,
  searchFields: string[]
): PipelineStage[] => {
  // Select Which field want to get or remove
  const fieldSelection: PipelineStage =
    Object.keys(queries.fields).length > 0
      ? {
          $project: queries.fields,
        }
      : { $addFields: {} };

  // Searching stage to search in all fields
  const searchStage = searchFields.map((field) => {
    return {
      [field]: {
        $regex: queries.search,
        $options: "i",
      },
    };
  });

  // Match stage to filter by field
  const matchStage: PipelineStage = {
    $match: {
      $and: [queries.filter, { $or: searchStage }],
    },
  };

  // Sorting stage to sort by field
  const sortStage: PipelineStage = {
    $sort: {
      [queries.sortBy]: queries.sortOrder,
    },
  };

  // Pagination stage to limit and skip
  const paginationStage: PipelineStage = {
    $facet: {
      data: [
        { $skip: queries.page * queries.limit },
        { $limit: queries.limit },
      ],
      totalDocuments: [{ $count: "total" }],
      totalResult: [matchStage, { $count: "total" }],
      totalPages: [
        {
          $project: {
            totalPages: {
              $ceil: {
                $divide: ["$totalResult.total", queries.limit],
              },
            },
          },
        },
      ],
    },
  };

  // Unwind stage to get data from array

  // Add all stages in array
  const stages: PipelineStage[] = [
    matchStage,
    sortStage,
    paginationStage,
    fieldSelection,
  ];

  return stages;
};

export default getAggregationStages;
