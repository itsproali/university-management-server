import config from "../../../config";
import { IUser } from "./user.interface";
import User from "./user.model";
import { generateUserId } from "./user.utils";

export const createUserService = async (info: IUser): Promise<IUser | null> => {
  info.id = await generateUserId();

  if (!info.password) {
    info.password = config.DEFAULT_STUDENT_PASS as string;
  }

  const result = await User.create(info);

  if (!result) {
    throw new Error("Failed to create User!");
  }
  return result;
};
