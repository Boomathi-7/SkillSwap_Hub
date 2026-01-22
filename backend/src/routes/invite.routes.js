import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  sendInvite,
  getInvites,
  acceptInvite
} from "../controllers/invite.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/send", asyncHandler(protect), asyncHandler(sendInvite));
router.get("/", asyncHandler(protect), asyncHandler(getInvites));
router.post("/accept/:inviteId", asyncHandler(protect), asyncHandler(acceptInvite));

export default router;
