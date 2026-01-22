import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json()); // 🔴 REQUIRED for login/register

export default app;
