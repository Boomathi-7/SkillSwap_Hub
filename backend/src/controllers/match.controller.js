import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMatches = async (req, res) => {
  try {
    const current = req.user;
    console.log("Current user:", current);

    // Get all users except current user
    const allUsers = await prisma.user.findMany();

    // Get user's sent and received invites
    const sentInvites = await prisma.invite.findMany({
      where: { senderId: current.id }
    });

    const receivedInvites = await prisma.invite.findMany({
      where: { receiverId: current.id }
    });

    // Get IDs of users already invited or who invited current user
    const connectedUserIds = new Set([
      current.id,
      ...sentInvites.map(i => i.receiverId),
      ...receivedInvites.map(i => i.senderId)
    ]);

    // Filter matches: exclude connected users and find skill matches
    const matches = allUsers.filter(u =>
      !connectedUserIds.has(u.id) &&
      current.skillsNeed.some(s => u.skillsHave.includes(s))
    );

    console.log("Matches found:", matches);
    res.json(matches);
  } catch (error) {
    console.error("Error in getMatches:", error);
    res.status(500).json({ error: error.message });
  }
};
