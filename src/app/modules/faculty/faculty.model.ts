import { Schema, Types, model } from "mongoose";
import { FacultyModel, IFaculty } from "./faculty.interface";

const FacultySchema = new Schema<IFaculty, FacultyModel>(
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
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
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

    academicFaculty: {
      type: Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },

    academicDepartment: {
      type: Types.ObjectId,
      ref: "AcademicDepartment",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Faculty = model<IFaculty, FacultyModel>("Faculty", FacultySchema);

export default Faculty;
