import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import cloudinary from "./config/cloudinaryConfig.js";
import Capsule from "./models/capsuleSchema.js";
import "./config/db.js";

import documentationRoutes from "./routes/documentation.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

//use the imported routes
app.use("/", documentationRoutes);
app.use("/users", userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log("Server started")
});