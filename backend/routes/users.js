import express from "express";
import { registerUser } from "../controllers/authController.js";

const router = express.Router();

//POST request to register endpoint to create a new user
router.post("/register", registerUser);

export default router;