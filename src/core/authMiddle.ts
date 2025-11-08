import { Request, Response, NextFunction } from "express";
import { sendForbiddenResponse } from "./responses";
import { IJWTResponse } from "./types";

export class AuthMiddleware {
  static authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization");
    if (!token) return sendForbiddenResponse(res, "User is not logged in");

    try {
      const jwt = require("jsonwebtoken");
      const decoded = jwt.verify(
        token.replace("Bearer ", ""),
        process.env.JWT_SECRET
      );
      req.user = decoded;

      next();
    } catch (error) {
      sendForbiddenResponse(res, "Invalid token");
    }
  }

  static roleCheck = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = req.user as IJWTResponse | undefined;
      if (!user || user.role !== requiredRole) return sendForbiddenResponse(res, "Unauthorized access");

      next();
    }
  }
}
