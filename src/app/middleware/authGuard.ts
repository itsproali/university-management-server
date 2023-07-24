import { NextFunction, Request, Response } from "express";
import ApiError from "../../utils/errors/ApiError";
import httpStatus from "http-status";
import { verifyToken } from "../../helpers/token";
import config from "../../config";

const authGuard =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Get token from header
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      // Verify token
      const verifiedToken = await verifyToken(token, config.JWT_SECRET);

      // Check if user has required roles
      if (requiredRoles.length && !requiredRoles.includes(verifiedToken.role)) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          "You don't have permission to access this resource"
        );
      }

      req.user = verifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };

export default authGuard;
