import { Model, Types } from "mongoose";
import { IAcademicDepartment } from "../academicDepartment/academicDepartment.interface";

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IAdmin = {
  id: string;
  name: UserName;
  dateOfBirth: Date | string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender: "male" | "female";
  permanentAddress?: string;
  presentAddress?: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  designation: string;
  profileImage: string;
  // managementDepartment: Types.ObjectId | IAcademicDepartment;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
