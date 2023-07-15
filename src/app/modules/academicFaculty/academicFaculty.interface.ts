import { Model } from "mongoose";

export interface IAcademicFaculty {
  title: string;
}

export type IAcademicFacultyModel = Model<IAcademicFaculty>;

export interface IAcademicFacultyFilters {
  title?: string;
  search?: string;
}
