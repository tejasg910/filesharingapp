import { Router } from "express";
import { upload } from "../middlewares/files.js";
import { uploadFileHandler } from "../controller/files.js";
export const router = Router();
//importing middlewares

router.post("/upload", upload.single("profile"), uploadFileHandler);
