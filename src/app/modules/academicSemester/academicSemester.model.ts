import { Schema, model } from "mongoose";
import {
  IAcademicSemester,
  IAcademicSemesterModel,
} from "./academicSemester.interface";
import { months } from "./academicSemester.utils";

import httpStatus from "http-status";
import ApiError from "../../../utils/errors/ApiError";

const academicSemesterSchema: Schema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: ["Autumn", "Summer", "Fall"],
    },

    year: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
      enum: ["01", "02", "03"],
    },

    startMonth: {
      type: String,
      required: true,
      enum: months,
    },

    endMonth: {
      type: String,
      required: true,
      enum: months,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Semester & year validation before save
academicSemesterSchema.pre<IAcademicSemester>("save", async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, "Semester already exists!");
  }

  next();
});

// Create AcademicSemester model
const AcademicSemester = model<IAcademicSemester, IAcademicSemesterModel>(
  "AcademicSemester",
  academicSemesterSchema
);

export default AcademicSemester;
