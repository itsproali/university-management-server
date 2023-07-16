import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import ApiError from "../../../utils/errors/ApiError";
import {
  IAcademicDepartment,
  IAcademicDepartmentModel,
} from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

academicDepartmentSchema.pre("save", async function (next) {
  const isExist = await AcademicDepartment.findOne({
    title: this.title,
  });

  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, "Faculty Already Exist");
  }

  next();
});

const AcademicDepartment = model<IAcademicDepartment, IAcademicDepartmentModel>(
  "AcademicDepartment",
  academicDepartmentSchema
);

export default AcademicDepartment;
