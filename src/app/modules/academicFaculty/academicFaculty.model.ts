import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import ApiError from "../../../utils/errors/ApiError";
import {
  IAcademicFaculty,
  IAcademicFacultyModel,
} from "./academicFaculty.interface";

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

academicFacultySchema.pre("save", async function (next) {
  const isExist = await AcademicFaculty.findOne({
    title: this.title,
  });

  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, "Faculty Already Exist");
  }

  next();
});

const AcademicFaculty = model<IAcademicFaculty, IAcademicFacultyModel>(
  "AcademicFaculty",
  academicFacultySchema
);

export default AcademicFaculty;
