import config from "../../../config";
import ApiError from "../../../utils/errors/ApiError";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";

import { IUser } from "./user.interface";
import User from "./user.model";
import { generateStudentId } from "./user.utils";

export const createStudentService = async (
  studentInfo: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // set default password
  if (!user.password) {
    user.password = config.DEFAULT_STUDENT_PASS as string;
  }

  // set role
  user.role = "student";

  // get academic semester
  const academicSemester = await AcademicSemester.findById(
    studentInfo.academicSemester
  );

  // Generate Student ID
  const generatedId = await generateStudentId(academicSemester);


  

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, "Failed to create User!");
  }
  return createdUser;
};
