const router = Router();
import { Router } from "express";
// imporing middlewares

// importing controllers
import {
  addFile,
  getAllReceivedFiles,
  getAllSentFiles,
} from "../controller/files.js";
import { isLoggedIn } from "../middlewares/auth.js";
import { upload } from "../middlewares/files.js";

router.post("/upload-file", isLoggedIn, upload.single("file"), addFile);
router.get("/get-received-files", isLoggedIn, getAllReceivedFiles);
router.get("/get-sent-files", isLoggedIn, getAllSentFiles);
export default router;
