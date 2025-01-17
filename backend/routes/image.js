import express from "express";
import multer from "multer";
import {newImage} from "../controllers/imageController.js";

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const router = express.Router();

router.post('/upload', upload.single('image'), newImage)
export default router;