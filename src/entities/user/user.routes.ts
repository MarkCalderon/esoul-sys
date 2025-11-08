import { body } from "express-validator";
import multer from "multer";
import { AuthMiddleware } from '../../core/authMiddle';
import storage from "../../core/multiStorage";
import { getUserProfile, loginUser, registerUser } from "./user.controller";

const express = require("express");
const router = express.Router();
const upload = multer({ storage: storage });

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
