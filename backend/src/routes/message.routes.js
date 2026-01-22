import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  sendMessage,
  getMessages,
  getRecentMessages,
  markMessageAsRead,
  getConnections
} from "../controllers/message.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/send", asyncHandler(protect), asyncHandler(sendMessage));
router.get("/recent/all", asyncHandler(protect), asyncHandler(getRecentMessages));
router.put("/:messageId/read", asyncHandler(protect), asyncHandler(markMessageAsRead));
router.get("/connections/all", asyncHandler(protect), asyncHandler(getConnections));
router.get("/:userId", asyncHandler(protect), asyncHandler(getMessages));

export default router;
