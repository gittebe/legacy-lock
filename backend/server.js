import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";
import cloudinary from "./config/cloudinaryConfig.js";

import documentationRoutes from "./routes/documentation.js";
import userRoutes from "./routes/users.js";
import capsuleRoutes from "./routes/capsule.js";
import mediaRoutes from "./routes/media.js";
import dashboardRoutes from "./routes/dashboard.js";


dotenv.config();

const app = express();
// const upload = multer();
const port = process.env.PORT || 8080;

//check connection to cloudinary
const checkConnection = async () => {
  try {
    // Eine einfache Anfrage, um den Account-Status zu überprüfen
    const result = await cloudinary.api.ping();
    console.log("Cloudinary connection successful:", result);
  } catch (error) {
    console.error("Error to connect to cloudinary:", error);
  }
};

checkConnection();

app.use(cors());
app.use(express.json());

//use the imported routes
app.use("/", documentationRoutes);
app.use("/users", userRoutes);
app.use("/capsule", capsuleRoutes);
app.use("/media",mediaRoutes);
app.use("/dashboard", dashboardRoutes)

// Start the server
app.listen(port, () => {
  console.log("Server running on http://localhost:${port}");
  console.log("Server started")
});