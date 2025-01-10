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