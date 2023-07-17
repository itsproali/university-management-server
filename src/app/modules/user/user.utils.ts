import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import User from "./user.model";

// Student
export const findLastStudentId = async () => {
  const user = await User.findOne({ role: "student" }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return user?.id.substring(4);
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, "0");
  let newId = (parseInt(currentId) + 1).toString().padStart(5, "0");

  newId = `${academicSemester?.year?.substring(2)}${
    academicSemester?.code
  }${newId}`;

  return newId;
};

// Faculty
export const findLastFacultyId = async () => {
  const user = await User.findOne({ role: "faculty" }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return user?.id.substring(2);
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, "0");
  let newId = (parseInt(currentId) + 1).toString().padStart(5, "0");

  newId = `F-${newId}`;

  return newId;
};

// Admin
export const findLastAdminId = async () => {
  const user = await User.findOne({ role: "admin" }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return user?.id.substring(2);
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, "0");
  let newId = (parseInt(currentId) + 1).toString().padStart(5, "0");

  newId = `A-${newId}`;

  return newId;
};
