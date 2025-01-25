import express from "express";
import {createCapsule, getCapsule, getUserCapsules, getReceivedCapsules, getCreateCapsulePage} from "../controllers/capsuleController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import upload from "../middleware/multer.js";

const router = express.Router();

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