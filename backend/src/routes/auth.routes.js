import express from "express";
import { register, login, forgotPassword } from "../controllers/auth.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.post("/forgot-password", asyncHandler(forgotPassword));

export default router;
