import { body } from "express-validator";
import { registerUser, loginUser, getUserProfile } from "./user.controller";
import { AuthMiddleware } from '../../core/authMiddle';
import multer from "multer";


const express = require("express");
const router = express.Router();
const upload = multer();



// Public routes
router.post(
  "/register",
  upload.none(),
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("username").isString().notEmpty().withMessage("Username is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);
router.post("/login", upload.none(), loginUser);
router.get("/profile", [AuthMiddleware.authenticate, AuthMiddleware.roleCheck("admin")], getUserProfile);

module.exports = router;
