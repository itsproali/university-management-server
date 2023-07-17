import { Model, Types } from "mongoose";
import { IStudent } from "../student/student.interface";

export type IUser = {
  id: string;
  password: string;
  role: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId;
  admin?: Types.ObjectId;
};

export type IUserMethods = {
  getRole(): string;
};

export type UserModel = Model<IUser, object, IUserMethods>;
