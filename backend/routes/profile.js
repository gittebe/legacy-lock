import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinaryConfig.js";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/uploadProfilePicture", upload.single("profilePicture"), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }
  
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_pictures",
      });
  
      // Clean up the temporary file
      fs.unlinkSync(req.file.path);
  
      res.status(200).json({ success: true, url: result.secure_url });
    } catch (error) {
      console.error("Cloudinary Upload Error:", error.message); // Log error message
      console.error("Stack Trace:", error.stack); // Log stack trace for debugging
      fs.unlinkSync(req.file.path); // Ensure temp file is deleted
      res.status(500).json({ success: false, error: "Failed to upload image." });
    }
  });  

export default router;
