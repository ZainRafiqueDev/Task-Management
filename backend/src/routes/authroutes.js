import { Router } from "express";
// import { body, validationResult } from "express-validator";
import {  register , login } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { ROLES } from "../model/User.js";

const router = Router();


router.post(
  "/register",
  register
);

router.get(
  "/login",
  login
);


// router.get("/me", protect, me);

export default router;
