import express from "express";
import {createCapsule, getCapsule, getUserCapsules, getReceivedCapsules, getCreateCapsulePage} from "../controllers/capsuleController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import upload from "../middleware/multer.js";
import mongoose from "mongoose";

const router = express.Router();

// Middleware to validate ObjectID
const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Backend: Invalid capsule ID format" });
    }
    next();
};

// Protected CreateCapsulePage Route (only for authenticated user)
router.get("/", authenticateUser, getCreateCapsulePage);

// POST to create a new capsule
router.post("/create", authenticateUser, upload.single("file"), createCapsule);

// GET to receive all the capsules the user has created
router.get("/getUserCapsules", authenticateUser, getUserCapsules)

// GET to receive all the capsules the user has received by other users
router.get("/getReceivedCapsules", authenticateUser, getReceivedCapsules)

// GET to get one capsule with capsule id
router.get("/:id", getCapsule);

export default router;