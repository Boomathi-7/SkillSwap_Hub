import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getMyNotifications, markNotificationAsRead } from "../controllers/notification.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(protect), asyncHandler(getMyNotifications));
router.put("/:notificationId/read", asyncHandler(protect), asyncHandler(markNotificationAsRead));

export default router;
