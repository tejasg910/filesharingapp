import { Router } from "express";
import { login, signup } from "../controller/auth.js";

const router = Router();
// importing controllers

router.post("/signup", signup);
router.post("/login", login);

export default router;
