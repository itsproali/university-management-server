import httpStatus from "http-status";
import asyncHandler from "../../../utils/errors/asyncHandler";
import {
  changePasswordService,
  loginUserService,
  refreshTokenService as refreshAccessTokenService,
} from "./auth.service";
import sendResponse from "../../../utils/sendResponse";
import { ILoginUserResponse } from "./auth.interface";
import config from "../../../config";

export const loginUser = asyncHandler(async (req, res) => {
  const { id, password } = req.body;
  const { refreshToken, ...others } = await loginUserService({ id, password });

  // Send refresh token as a cookie
  res.cookie("refreshToken", refreshToken, {
    secure: !config.isDevelopment,
    httpOnly: true,
  });

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successful",
    data: others,
  });
});

// Refresh Access Token using Refresh Token
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await refreshAccessTokenService(refreshToken);

  sendResponse<{ accessToken: string } | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Refresh token successful",
    data: result,
  });
});

// Change Password
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { userId } = req.user;

  await changePasswordService({ userId, oldPassword, newPassword });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully",
  });
});
