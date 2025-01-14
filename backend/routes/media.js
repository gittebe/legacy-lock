import {uploadMedia, getAllMedia, getMediaById, deleteMedia} from "../controllers/mediaController.js";
import express from "express";

const router = express.Router();

//POST: Upload media (image/video)
router.post("/upload", uploadMedia);

//GET: All media
router.get("/", getAllMedia);

//GET: media with public_id
router.get("/:public_id", getMediaById);

// DELETE media
router.delete("/:public_id", deleteMedia);

export default router;
