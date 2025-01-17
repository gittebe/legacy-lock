import cloudinary from "../config/cloudinaryConfig.js";
import { Capsule } from "../models/capsuleSchema.js";
import streamifier from 'streamifier';

// Helper function to handle the Cloudinary upload with Promises
const uploadToCloudinary = (file, resource_type, uploadFolder) => {
  return new Promise((resolve, reject) => {
    const cloudinaryUpload = cloudinary.uploader.upload_stream(
      {
        folder: uploadFolder,
        resource_type: resource_type, // Can be 'image' or 'video'
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error", error)
          reject(error); // Reject promise on error
        } else {
          resolve(result); // Resolve promise with the result (e.g., URL and public_id)
        }
      }
    );
    cloudinaryUpload.end(file.buffer); // End the stream and upload the file buffer
  });
};

// Create a new capsule
export const createCapsule = async (req, res) => {
  try {
    const { title, message, resource_type } = req.body;
    const file = req.file;  // Die Datei wird aus req.file extrahiert

    // Check if either file or resource_type is provided, if resource_type is present it should also have a file
    if (resource_type && !file) {
      return res.status(400).json({ message: "File must be provided when resource_type is specified." });
    }

    let cloudinaryUpload = null;
    let url = "";
    let public_id = "";

    // Wenn eine Datei bereitgestellt wurde, wird sie zu Cloudinary hochgeladen
    if (file) {
      if (!resource_type) {
        return res.status(400).json({ message: "resource_type is required when a file is provided." });
      }

      // Bestimme den Upload-Ordner basierend auf dem resource_type
      const uploadFolder = resource_type === 'image' ? 'capsules/images' : 'capsules/videos';

      // Versuche, die Datei mit der uploadToCloudinary-Funktion hochzuladen
      try {
        console.log("Starting file upload to Cloudinary...");

        const uploadResult = await uploadToCloudinary(file, resource_type, uploadFolder);

        // Wenn der Upload erfolgreich war
        url = uploadResult.secure_url;
        public_id = uploadResult.public_id;
        console.log("File uploaded to Cloudinary:", uploadResult);
      } catch (error) {
        console.error("Error during Cloudinary upload:", error);
        return res.status(500).json({ message: `Error uploading ${resource_type} to Cloudinary`, error });
      }
    }

    // Erstelle das neue Capsule-Objekt und speichere es in MongoDB
    const newCapsule = new Capsule({
      title,
      message,
      url: url || undefined,
      public_id: public_id || undefined,
      resource_type: resource_type || null,
    });

    await newCapsule.save();

    res.status(201).json({
      message: "Capsule created successfully",
      data: newCapsule,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating Capsule", error });
  }
};
