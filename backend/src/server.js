import dotenv from "dotenv";
import app from "./app.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import matchRoutes from "./routes/match.routes.js";
import inviteRoutes from "./routes/invite.routes.js";
import messageRoutes from "./routes/message.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

dotenv.config();

// 🔗 ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/invites", inviteRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);

// 🟢 HEALTH CHECK
app.get("/", (req, res) => {
  res.json({
    status: "Backend is running",
    message: "Skill Swap Hub API"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
