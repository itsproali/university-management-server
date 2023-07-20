import { Model } from "mongoose";

export interface IManagementDepartment {
  title: string;
}

export type ManagementDepartmentModel = Model<IManagementDepartment, object>;
