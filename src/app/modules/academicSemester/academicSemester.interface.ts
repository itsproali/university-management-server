import { Model } from "mongoose";

export interface IAcademicSemester {
  title: "Autumn" | "Summer" | "Fall";
  year: number;
  code: "01" | "02" | "03";
  startMonth: string;
  endMonth: string;
}

export type IAcademicSemesterModel = Model<IAcademicSemester>;
