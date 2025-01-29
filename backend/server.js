import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";
import cloudinary from "./config/cloudinaryConfig.js";
import multer from "multer";
import fs from "fs";

import documentationRoutes from "./routes/documentation.js";
import userRoutes from "./routes/users.js";
import capsuleRoutes from "./routes/capsule.js";
import mediaRoutes from "./routes/media.js";
import dashboardRoutes from "./routes/dashboard.js";
import profileRoutes from "./routes/profile.js"; // Import profile routes

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Configure multer for handling file uploads
const upload = multer({ dest: "uploads/" });

// Check connection to Cloudinary
const checkConnection = async () => {
  try {
    const result = await cloudinary.api.ping();
    console.log("Cloudinary connection successful:", result);
  } catch (error) {
    console.error("Error connecting to Cloudinary:", error);
  }
};

checkConnection();

app.use(cors());
app.use(express.json());

// Use the profile routes
app.use("/api/profile", profileRoutes);

// Use the imported routes
app.use("/", documentationRoutes);
app.use("/users", userRoutes);
app.use("/capsule", capsuleRoutes);
app.use("/media", mediaRoutes);
app.use("/dashboard", dashboardRoutes);

// Fallback route for undefined endpoints
app.use((req, res) => {
  console.log(`Fallback: Route not found for ${req.method} ${req.url}`);
  res.status(404).json({ message: "Backend: Route not found" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
