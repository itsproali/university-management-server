import { z } from "zod";
import { months } from "./academicSemester.utils";

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(["Autumn", "Summer", "Fall"], {
      required_error: "Title is required",
    }),
    year: z.number({ required_error: "Year is required" }),
    code: z.enum(["01", "02", "03"]),
    startMonth: z.enum(months, {
      required_error: "Start month is required",
    }),
    endMonth: z.enum(months, {
      required_error: "End month is required",
    }),
  }),
});

export default createAcademicSemesterZodSchema;
