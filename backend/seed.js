import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clear existing users
  await prisma.user.deleteMany({});

  // Create test users with complementary skills
  const user1 = await prisma.user.create({
    data: {
      name: "Alice",
      qualification: "Frontend Developer",
      email: "alice@test.com",
      mobile: "1234567890",
      password: await bcrypt.hash("password123", 10),
      skillsHave: ["JavaScript", "React"],
      skillsNeed: ["Python", "Design"]
    }
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob",
      qualification: "Backend Developer",
      email: "bob@test.com",
      mobile: "0987654321",
      password: await bcrypt.hash("password123", 10),
      skillsHave: ["Python", "Node.js"],
      skillsNeed: ["React", "UI Design"]
    }
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Carol",
      qualification: "UI/UX Designer",
      email: "carol@test.com",
      mobile: "5555555555",
      password: await bcrypt.hash("password123", 10),
      skillsHave: ["Design", "Figma"],
      skillsNeed: ["JavaScript", "Python"]
    }
  });

  console.log("✅ Test users created:");
  console.log("Alice - has: JavaScript, React | needs: Python, Design");
  console.log("Bob - has: Python, Node.js | needs: React, UI Design");
  console.log("Carol - has: Design, Figma | needs: JavaScript, Python");
  console.log("\nNow login with:");
  console.log("Email: alice@test.com | Password: password123");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
