import Folder from "../models/folderSchema.js";
import Capsule from "../models/capsuleSchema.js";

//Create a new folder
export const createFolder = async (req, res) => {
  const {folderName} = req.body;
  // const {userId} = req.user; //the user has to be loggedin

  try {
    const newFolder = new Folder({
      userId,
      folderName
    });
    await newFolder.save();

    res.status(201).json({
      message: "Folder created successfully",
      folder: newFolder
    });
  } catch (err) {
    return res.status(500).json({message: "Error creating folder", error: err.message});
  }
}

//All folder of the user
export const getUserFolders = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  const {userId} = req.user;
  try {
    const folders = await Folder.find({userId});

    res.status(200).json({
      success: true,
      folders
    });
  } catch (error) {
    return res.status(500).json({message: "Error retrieving folders", error});
  }
}