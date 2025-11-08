import { NextFunction, Request, Response } from "express";
import { sendForbiddenResponse, sendOkResponse, sendServerError } from "../../core/responses";
import { IJWTResponse } from "../../core/types";
import File, { IFile } from "./file.model";
import fs from 'fs';
import path from 'path';


export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  const user = req?.user as IJWTResponse | undefined;
  if(!user) return sendForbiddenResponse(res, "User not authenticated");

  if(!req.file) {
    return sendServerError(res, "No file uploaded");
  }

  try {
    const { filename, originalname, size, mimetype, path } = req.file;
    const result: IFile = await File.create({
      fileName: filename,
      originalName: originalname,
      size,
      mimeType: mimetype,
      filePath: path,
    });

    return sendOkResponse({
      res,
      payload: result?._id,
      message: "File uploaded successfully",
    });
  } catch (error) {
     if (req.file) {
      fs.unlink(path.join(req.file.path), (err) => {
        if (err) console.error('Failed to delete file:', err);
      });
    }

    return sendServerError(res, "Failed to upload file");
  }
};
