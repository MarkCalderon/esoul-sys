import { body } from "express-validator";
import { registerUser, loginUser } from "./user.controller";
import multer from "multer";

const express = require("express");
const router = express.Router();
const upload = multer();

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

module.exports = router;
