import { Model } from "mongoose";
import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface";

export interface IAcademicDepartment {
  title: string;
  academicFaculty: IAcademicFaculty | string;
}

export type IAcademicDepartmentModel = Model<IAcademicDepartment>;

export interface IAcademicDepartmentFilters {
  title?: string;
  search?: string;
}
