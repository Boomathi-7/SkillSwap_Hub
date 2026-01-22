import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getMatches } from "../controllers/match.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const router = express.Router();

router.get("/", asyncHandler(protect), asyncHandler(getMatches));
export default router;
