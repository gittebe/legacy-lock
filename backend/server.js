import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import "./config/db.js";
import cloudinary from "./config/cloudinaryConfig.js";

import documentationRoutes from "./routes/documentation.js";
import userRoutes from "./routes/users.js";
import capsuleRoutes from "./routes/capsule.js";
import imageRoutes from "./routes/image.js";


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

//multer-configuration
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage});

app.use(cors());
app.use(express.json());

//use the imported routes
app.use("/", documentationRoutes);
app.use("/users", userRoutes);
app.use("/capsule", capsuleRoutes);
app.use("/image",imageRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log("Server started")
});