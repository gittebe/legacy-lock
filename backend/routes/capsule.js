import express from "express";
import {createCapsule, getCapsule} from "../controllers/capsuleController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/create", authenticateUser, upload.single("file"), createCapsule);

router.get("/getCapsule/:id", getCapsule)

export default router;