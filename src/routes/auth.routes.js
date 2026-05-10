import express from "express";
import { register, login, verifyOtp } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";

const router = express.Router(); 

// Register
router.post("/register", validate(registerSchema), register);

// Login
router.post("/login", validate(loginSchema), login);

// OTP verify
router.post("/verify-otp", verifyOtp); 

export default router;