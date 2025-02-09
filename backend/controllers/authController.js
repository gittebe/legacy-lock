import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import dotenv from 'dotenv';

dotenv.config();

// handles user registration logic
export const registerUser = async (req, res) => {
  const {email, password, username } = req.body;

  try {
//check if the email already exists in the database
const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  };

// Create a new user with the hashed password
const newUser = new User ({ email, password, username });

const accessToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
newUser.accessToken = accessToken;

// Save the new user to the database
await newUser.save();

// Respond with a success message
res.status(201).json({
  success: true,
  message: "User created successfully", 
  user:{
    id: newUser._id,
    email: newUser.email,
    username: newUser.username,
  },
accessToken,
});
} catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//Login User
export const loginUser = async (req, res) => {
  try {
    const { emailOrUsername, password} = req.body;

    //check for email or username
    const user = await User.findOne({
      $or: [{email: emailOrUsername}, {username: emailOrUsername}]
    });
    if(!user) {
      return res.status(400).json({message:"User not found"});
    }

    //compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password is valid:", isPasswordValid);
    if(!isPasswordValid) {
      return res.status(400).json({message: "Invalid password"});
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    user.accessToken = accessToken;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      accessToken,
    });
  } catch (error) {
      res.status(500).json({message: "Server error", error});
  }
};

//Logout user 
export const logoutUser = async (req, res)=> {
  try {
    const user = req.user;
    user.accessToken = null;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
    } catch (error) {
      res.status(500).json({message: "Server error", error});
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne();
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};