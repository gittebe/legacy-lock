import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";

const router = express.Router();

//POST request to register endpoint to create a new user
router.post("/register", registerUser);

//POST request for login
router.post("/login", loginUser);

//POST request for logout
router.post("/logout", logoutUser)

export default router;