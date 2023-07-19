import { Schema, Types, model } from "mongoose";
import { bloodGroup, gender } from "../user/user.constant";
import { AdminModel, IAdmin } from "./admin.interface";

const AdminSchema = new Schema<IAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
        },
      },
      required: true,
    },

    dateOfBirth: {
      type: Date || String,
      required: true,
    },

    gender: {
      type: String,
      enum: gender,
      required: true,
    },

    bloodGroup: {
      type: String,
      enum: bloodGroup,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    contactNo: {
      type: String,
      unique: true,
      required: true,
    },

    emergencyContactNo: {
      type: String,
      required: true,
    },

    presentAddress: {
      type: String,
      required: true,
    },

    permanentAddress: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
    },

    // managementDepartment: {
    //   type: Types.ObjectId,
    //   ref: "AcademicDepartment",
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Admin = model<IAdmin, AdminModel>("Admin", AdminSchema);

export default Admin;
