import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user.id;

    if (!receiverId || !content) {
      return res.status(400).json({ message: "Missing receiverId or content" });
    }

    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId: Number(receiverId),
        content
      },
      include: {
        sender: { select: { id: true, name: true, email: true } },
        receiver: { select: { id: true, name: true, email: true } }
      }
    });

    res.json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get messages between two users
export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: currentUserId, receiverId: Number(userId) },
          { senderId: Number(userId), receiverId: currentUserId }
        ]
      },
      include: {
        sender: { select: { id: true, name: true } },
        receiver: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: "asc" }
    });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get recent unread messages with senders
export const getRecentMessages = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    // Get latest unread messages from each sender
    const messages = await prisma.message.findMany({
      where: {
        receiverId: currentUserId,
        isRead: false
      },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        sender: { select: { id: true, name: true } }
      }
    });

    // Group by sender and get unique senders
    const groupedMessages = [];
    const seenSenders = new Set();

    messages.forEach(msg => {
      if (!seenSenders.has(msg.senderId)) {
        groupedMessages.push(msg);
        seenSenders.add(msg.senderId);
      }
    });

    res.json(groupedMessages);
  } catch (error) {
    console.error("Error fetching recent messages:", error);
    res.status(500).json({ error: error.message });
  }
};

// Mark message as read
export const markMessageAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await prisma.message.update({
      where: { id: Number(messageId) },
      data: { isRead: true }
    });

    res.json(message);
  } catch (error) {
    console.error("Error marking message as read:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get connections (users with accepted invites)
export const getConnections = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    console.log("Getting connections for user:", currentUserId);

    // Get accepted invites where user is sender or receiver
    const acceptedInvites = await prisma.invite.findMany({
      where: {
        status: "ACCEPTED",
        OR: [
          { senderId: currentUserId },
          { receiverId: currentUserId }
        ]
      }
    });

    console.log("Accepted invites:", acceptedInvites);

    // Get connected user IDs
    const connectedUserIds = acceptedInvites.map(invite =>
      invite.senderId === currentUserId ? invite.receiverId : invite.senderId
    );

    console.log("Connected user IDs:", connectedUserIds);

    // Get user details for connected users
    const connections = await prisma.user.findMany({
      where: {
        id: { in: connectedUserIds }
      },
      select: {
        id: true,
        name: true,
        qualification: true,
        email: true,
        skillsHave: true
      }
    });

    console.log("Connections found:", connections);
    res.json(connections);
  } catch (error) {
    console.error("Error fetching connections:", error);
    res.status(500).json({ error: error.message });
  }
};
