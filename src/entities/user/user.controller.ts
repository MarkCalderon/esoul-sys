import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { sendForbiddenResponse, sendOkResponse, sendServerError } from "../../core/responses";
import User, { IUser } from "./user.model";
import { IJWTResponse } from "../../core/types";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("there is error");
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: IUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    return sendOkResponse({
      res,
      payload: user,
      message: "User registered successfully",
    });
  } catch (error) {
    return sendServerError(res, "Failed to register user");
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User is not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    try {
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );
      return sendOkResponse({
        res,
        payload: { token },
        message: "Login successful",
      });
    } catch (err) {
      console.error("JWT sign error:", err);
    }
  } catch (error) {
    return sendServerError(res, "Failed to login user");
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req?.user as IJWTResponse | undefined;
  if(!user) return sendForbiddenResponse(res, "User not authenticated");

  try {
    const userData = await User.findOne({ _id: user.id }).select('username email role');
    return sendOkResponse({
      res,
      payload: userData,
      message: "User profile retrieved successfully",
    });
  } catch (error) {
    return sendServerError(res, "Failed to retrieve users");
  }
};