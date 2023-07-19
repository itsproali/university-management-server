import httpStatus from "http-status";
import mongoose, { Types } from "mongoose";
import config from "../../../config";
import ApiError from "../../../utils/errors/ApiError";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import Student from "../student/student.model";
import { IUser } from "./user.interface";
import User from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";
import Faculty from "../faculty/faculty.model";
import { IFaculty } from "../faculty/faculty.interface";
import { IAdmin } from "../admin/admin.interface";
import Admin from "../admin/admin.model";

// Create student user service
export const createStudentService = async (
  studentInfo: IStudent,
  user: IUser
): Promise<IUser | null> => {
  let newUserId: Types.ObjectId | null = null;

  // get academic semester
  const academicSemester = await AcademicSemester.findById(
    studentInfo.academicSemester
  );

  if (!academicSemester) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Academic semester not found");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // Generate Student ID
    const generatedId = await generateStudentId(academicSemester);
    studentInfo.id = generatedId;

    const newStudent = await Student.create([studentInfo], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to creating student");
    }

    // Setting user data
    if (!user.password) {
      user.password = config.DEFAULT_STUDENT_PASS as string;
    }
    user.id = generatedId;
    user.role = "student";
    user.student = newStudent[0]._id;

    // Create user
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    newUserId = newUser[0]?._id;

    // End transaction
    await session.commitTransaction();
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  const result = await User.findById(newUserId).populate({
    path: "student",
    populate: [
      {
        path: "academicSemester",
      },
      {
        path: "academicDepartment",
      },
      { path: "academicFaculty" },
    ],
  });

  return result;
};

// Create faculty user service
export const createFacultyService = async (
  facultyInfo: IFaculty,
  user: IUser
) => {
  let result = null;

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const generatedId = await generateFacultyId();

    // Set Faculty data and create a faculty
    facultyInfo.id = generatedId;
    const newFaculty = await Faculty.create([facultyInfo], { session });
    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to creating faculty");
    }

    // Set user data and create an user
    if (!user.password) {
      user.password = config.DEFAULT_FACULTY_PASS as string;
    }
    user.id = generatedId;
    user.role = "faculty";
    user.faculty = newFaculty[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    result = newUser[0];
    await session.commitTransaction();
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  // Populate faculty data
  result = await User.findById(result?._id).populate({
    path: "faculty",
    populate: [
      {
        path: "academicDepartment",
      },
      {
        path: "academicFaculty",
      },
    ],
  });

  return result;
};

// Create admin user service
export const createAdminService = async (adminInfo: IAdmin, user: IUser) => {
  let result = null;

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const generatedId = await generateAdminId();

    // Set admin data and create an admin
    adminInfo.id = generatedId;
    const newAdmin = await Admin.create([adminInfo], { session });
    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to creating admin");
    }

    // Set user data and create an user
    if (!user.password) {
      user.password = config.DEFAULT_ADMIN_PASS as string;
    }
    user.id = generatedId;
    user.role = "admin";
    user.admin = newAdmin[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    result = newUser[0];
    await session.commitTransaction();
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  // Populate admin data
  result = await User.findById(result?._id);
  // .populate({
  //   path: "admin",
  //   populate: [
  //     {
  //       path: "academicDepartment",
  //     },
  //     {
  //       path: "academicFaculty",
  //     },
  //   ],
  // });

  return result;
};
