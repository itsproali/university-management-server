import httpStatus from "http-status";
import ApiError from "../../../utils/errors/ApiError";
import User from "../user/user.model";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";
import { createToken, verifyToken } from "../../../helpers/token";
import config from "../../../config";

export const loginUserService = async (
  payload: ILoginUser
): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  const user = await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needPasswordChange: 1 }
  );

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
  }

  // Create access token and refresh token
  const { id: userId, role, needPasswordChange } = user;
  const accessToken = createToken(
    { userId, role },
    config.JWT_SECRET,
    config.JWT_EXPIRES_IN
  );

  const refreshToken = createToken(
    { userId, role },
    config.JWT_REFRESH_SECRET,
    config.JWT_REFRESH_EXPIRES_IN
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  };
};

// refresh token service
export const refreshTokenService = async (
  refreshToken: string
): Promise<{ accessToken: string } | null> => {
  let verifiedToken;
  try {
    // verify refresh token
    verifiedToken = verifyToken(refreshToken, config.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token");
  }

  const { userId, role } = verifiedToken;
  // check if user exists
  const user = await User.findOne({ id: userId }, { id: 1, role: 1 });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // Create access token and refresh token
  const accessToken = createToken(
    { userId, role },
    config.JWT_SECRET,
    config.JWT_EXPIRES_IN
  );

  return {
    accessToken,
  };
};
