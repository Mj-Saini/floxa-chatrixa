import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import { handleDemo } from "./routes/demo";
import authRoutes from "./routes/auth";

// Load environment variables
dotenv.config();

export function createServer() {
  const app = express();

  // Connect to MongoDB
  connectDB();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  // Example API routes
  app.get("/api/demo", handleDemo);

  // Authentication routes
  app.use("/api/auth", authRoutes);

  return app;
}
