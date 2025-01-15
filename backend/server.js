import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import "./config/db.js";

import documentationRoutes from "./routes/documentation.js";
import userRoutes from "./routes/users.js";
// import mediaRoutes from "./routes/media.js";
// import folderRoutes from "./routes/folder.js";
// import {uploadMedia} from "./controllers/mediaController.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

//multer-configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

app.use(cors());
app.use(express.json());

//use the imported routes
app.use("/", documentationRoutes);
app.use("/users", userRoutes);
// app.use("/media", mediaRoutes);
// app.use("/folder", folderRoutes);

//POST-endpoint to upload media
// app.post("/media/upload", upload.single("media"), uploadMedia)

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log("Server started")
});