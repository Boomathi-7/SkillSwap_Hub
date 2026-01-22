import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMyNotifications = async (req, res) => {
  const myNotifications = await prisma.notification.findMany({
    where: { 
      userId: req.user.id,
      isRead: false
    },
    orderBy: { createdAt: "desc" }
  });

  res.json(myNotifications);
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await prisma.notification.update({
      where: { id: Number(notificationId) },
      data: { isRead: true }
    });

    res.json(notification);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: error.message });
  }
};
