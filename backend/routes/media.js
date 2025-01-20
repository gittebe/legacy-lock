import express from "express";
import {newMedia} from "../controllers/mediaController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post('/upload', upload.single('file'), newMedia)
export default router;