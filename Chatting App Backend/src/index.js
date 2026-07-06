
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

/* ===================== MIDDLEWARE ===================== */
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

/* ===================== ROUTES ===================== */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

/* ===================== HEALTH CHECK ===================== */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* ===================== SERVER ===================== */
server.listen(PORT, () => {
  console.log("Server running on PORT:", PORT);
  connectDB();
});
