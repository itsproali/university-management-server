/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { IStudent } from "../student/student.interface";

export type IUser = {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId;
  admin?: Types.ObjectId;
};

export type IUserMethods = {
  comparePassword(password: string): Promise<boolean>;
};

export type UserModel = Model<IUser, object, IUserMethods>;
