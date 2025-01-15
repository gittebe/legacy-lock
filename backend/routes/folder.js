import express from "express";
import {createFolder, getUserFolders} from "../controllers/folderController.js";

const router = express.Router();

//POST to create folder
router.post("/create", createFolder);

//GET to get all folders
router.get("/", getUserFolders);

export default router;