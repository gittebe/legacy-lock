import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const router = express.Router();

// Protected Dashboard Route (only for authenticated user)
router.get("/", authenticateUser, getDashboard);

export default router;