import express from "express";
import { registerUser, loginUser, logoutUser, deleteUser } from "../controllers/authController.js";
import {getUsers, getUserById, getCurrentUser} from "../controllers/userController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const router = express.Router();

//POST request to register endpoint to create a new user
router.post("/register", registerUser);

//POST request for login
router.post("/login", loginUser);

//POST request for logout
router.post("/logout", authenticateUser, logoutUser)

//DELETE user
router.delete("/deleteUser/:userId", deleteUser)

//GET request to retrieve all users
router.get("/users", getUsers)

//GET request to retrieve user data by ID
router.get("/users/:id", authenticateUser, getUserById);

//GET request to retrieve current authenticated user's data
router.get("/me", authenticateUser, getCurrentUser)

export default router;