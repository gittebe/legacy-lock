import express from "express";
import {createCapsule} from "../controllers/capsuleController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/create", upload.single("file"), createCapsule);
export default router;