import cloudinary from "../config/cloudinaryConfig.js";
import { Media } from "../models/mediaSchema.js";
import fs from "fs";

//upload new media (video or image)
export const newMedia = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto" });
    console.log("Cloudinary upload result:", result);
    // Clean up file
    fs.unlinkSync(req.file.path);

    const newMedia = new Media({
      url: result.secure_url,
      public_id: result.public_id,
    });
    //new image document is saved to the MongoDB
    const savedMedia = await newMedia.save();
    // return the saved media
    return savedMedia;

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};