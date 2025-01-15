import express from "express";
import {createFolder, getUserFolders} from "../controllers/folderController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const router = express.Router();

//POST to create folder
router.post("/create", authenticateUser, createFolder);

//GET to get all folders
router.get("/", authenticateUser, getUserFolders);

export default router;