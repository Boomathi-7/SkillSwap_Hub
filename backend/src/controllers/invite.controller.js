import { PrismaClient } from "@prisma/client";
import { sendEmail } from "../services/mail.service.js";

const prisma = new PrismaClient();

/**
 * SEND INVITE
 */
export const sendInvite = async (req, res) => {
  const sender = req.user;
  const { receiverId } = req.body;

  const existingInvite = await prisma.invite.findFirst({
    where: {
      receiverId: Number(receiverId),
      senderId: sender.id,
      status: "PENDING"
    }
  });

  if (existingInvite) {
    return res.status(400).json({ message: "Invite already sent" });
  }

  await prisma.invite.create({
    data: {
      receiverId: Number(receiverId),
      senderId: sender.id,
      status: "PENDING",
      senderName: sender.name,
      senderEmail: sender.email,
      senderSkills: sender.skillsHave || []
    }
  });

  res.json({ message: "Invite sent" });
};

/**
 * GET INVITES
 */
export const getInvites = async (req, res) => {
  const myInvites = await prisma.invite.findMany({
    where: {
      receiverId: req.user.id,
      status: "PENDING"
    }
  });

  res.json(myInvites);
};

/**
 * ACCEPT INVITE
 */
export const acceptInvite = async (req, res) => {
  try {
    const inviteId = Number(req.params.inviteId);
    console.log("Accepting invite:", inviteId);
    console.log("Current user:", req.user);

    const invite = await prisma.invite.findUnique({
      where: { id: inviteId }
    });

    console.log("Invite found:", invite);

    if (!invite) {
      return res.status(404).json({ message: "Invite not found" });
    }

    if (invite.receiverId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update invite status
    await prisma.invite.update({
      where: { id: inviteId },
      data: { status: "ACCEPTED" }
    });

    // 🔔 CREATE NOTIFICATION
    try {
      await prisma.notification.create({
        data: {
          userId: invite.senderId,
          message: `${req.user.name} accepted your skill swap invite`
        }
      });
    } catch (notifError) {
      console.error("Error creating notification:", notifError);
    }

    // 📧 SEND EMAIL (optional - won't crash if fails)
    try {
      await sendEmail(
        invite.senderEmail,
        "Skill Swap Invite Accepted 🎉",
        `${req.user.name} has accepted your skill swap invite.`
      );
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Don't throw - email is optional
    }

    res.json({ message: "Invite accepted successfully" });
  } catch (error) {
    console.error("Error in acceptInvite:", error);
    res.status(500).json({ error: error.message });
  }
};
