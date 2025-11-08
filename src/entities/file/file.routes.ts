import multer from "multer";
import { AuthMiddleware } from '../../core/authMiddle';
import storage from "../../core/multiStorage";
import { uploadFile } from "./file.controller";

const express = require("express");
const router = express.Router();
const upload = multer({ storage: storage });

router.post("/upload", [AuthMiddleware.authenticate], upload.single("file"), uploadFile);

module.exports = router;
