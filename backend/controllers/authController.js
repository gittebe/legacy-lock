import bcrypt from "bcrypt";
import { User } from "../models/userSchema.js";

// handles user registration logic
export const registerUser = async (req, res) => {
  const {email, password, username } = req.body;

  try {
//check if the email already exists in the database
const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  };

// Hash the password before saving the user
const salt = bcrypt.genSaltSync(20);
const hashedPassword = bcrypt.hashSync(password, salt);

// Create a new user with the hashed password
const newUser = new User ({ email, password: hashedPassword, username });

// Safe the new user to the database
await newUser.save();

// Respond with a success message
res.status(201).json({
  success: true,
  message: "User created successfully", 
  user:{
    id: newUser._id,
    email: newUser.email,
    username: newUser.username,
    accessToken: newUser.accessToken
  }
});
} catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};