import { User } from "../models/userSchema.js";

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