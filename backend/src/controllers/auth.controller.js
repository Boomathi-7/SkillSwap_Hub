import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  console.log("REGISTER BODY:", req.body);

  const {
    name, qualification, email, mobile,
    password, skillsHave, skillsNeed
  } = req.body;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      qualification,
      email,
      mobile,
      password: hashed,
      skillsHave,
      skillsNeed
    }
  });

  res.json({ message: "User registered" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(404).json({ message: "User not found" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });
  res.json({ token });
};

// Forgot password
export const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "Email not registered" });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { email },
    data: { password: hashed }
  });

  res.json({ message: "Password reset successful" });
};
