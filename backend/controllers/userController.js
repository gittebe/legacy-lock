import { User } from "../models/userSchema.js";
import { newMedia } from "./mediaController.js";
import upload from "../middleware/multer.js";
import cloudinary from "../config/cloudinaryConfig.js";

//get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params; // Extract ID from the URL parameter
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.mail,
        username: user.username,
        profileImage: profileImage
      }
    });
  } catch (error) {
    res.status(500).json({message: "Server error", error})
  }
};

// upload profile image
export const uploadProfileImage = async (req, res) => {
  try {
    console.log("File uploaded:", req.file);
    
    if (!req.file) {
      return res.status(400).json({ message: "no image uploaded" });
    }

    const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_pictures",
      use_filename: true,
      unique_filename: false,
    });

    const imageUrl = uploadResponse.secure_url;

    const updateUser = await User.findOneAndUpdate({ _id: req.user.id }, { profileImage: imageUrl });
  
    // successfully uploaded message
    return res.status(200).json({ message: "profileimage successfully uploaded", imageUrl });

  } catch (error) {
    console.error("error uploading image:", error);
    return res.status(500).json({ message: "error uploading image", error });
  }
};