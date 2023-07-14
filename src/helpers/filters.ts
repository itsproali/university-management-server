export const getOrSearchFilter = (
  search: string | undefined,
  searchableFields: string[]
) => {
  let searchFilter = {};

  if (search) {
    searchFilter = {
      $or: searchableFields.map((field) => ({
        [field]: {
          $regex: search || "",
          $options: "i",
        },
      })),
    };
  }

  return searchFilter;
  // { $or:[ {field1: { $regex: "value1", $options: "i" }}, {field2: { $regex: "value2", $options: "i"}} ] }
};

export const getAndSearchFilter = (filters: { [key: string]: string }) => {
  let andFilter = {};

  if (Object.keys(filters).length) {
    andFilter = {
      $and: Object.entries(filters).map(([key, value]) => ({
        [key]: value,
      })),
    };
  }

  return andFilter;

  // { $and:[ {field1: "value1"}, {field2: "value2"} ] }
};
