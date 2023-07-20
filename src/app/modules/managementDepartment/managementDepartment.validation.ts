import { z } from "zod";

export const createManagementDepartmentZodSchema = z.object({
  body: z
    .object({
      title: z.string({
        required_error: "Title is must required",
        invalid_type_error: "Title must be a string",
      }),
    })
    .strict(),
});

export const updateManagementDepartmentZodSchema = z.object({
  body: z
    .object({
      title: z
        .string({
          required_error: "Title is must required",
          invalid_type_error: "Title must be a string",
        })
        .optional(),
    })
    .strict(),
});
