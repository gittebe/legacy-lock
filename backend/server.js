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

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

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

// app.use(cors({
//   origin: "https://legacy-locket.netlify.app",
//   methods: ["GET", "POST", "DELETE", "PUT"],
//   allowedHeaders: ["Content-Type", "Authorization", "*"],
// }));

const allowedOrigins = [
  "https://legacy-locket.netlify.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization", "*"],
}));


app.options("*", cors());
app.use(express.json());


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
