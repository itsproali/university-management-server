import { Model, Types } from "mongoose";
import { IAcademicDepartment } from "../academicDepartment/academicDepartment.interface";
import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface";

export type UserName = {
  firstName: string;
  lastName: string;
  middleName?: string;
};

export type IFaculty = {
  id: string;
  name: UserName;
  dateOfBirth: Date | string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender: "male" | "female";
  permanentAddress?: string;
  presentAddress?: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  designation: string;
  profileImage?: string;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type FacultyModel = Model<IFaculty, object>;
