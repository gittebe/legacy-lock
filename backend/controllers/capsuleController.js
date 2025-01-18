import {Capsule} from "../models/capsuleSchema.js";
import { newMedia } from "./mediaController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import mongoose from "mongoose";

// create a new capsule
export const createCapsule = async (req, res) => {
  const {title, message, createdAt, openAt} = req.body;

  try {
    // Array to store the media URLs if there is media uploaded
    let mediaUrls = [];
    console.log("req.file", req.file)
    // Check if there is a file upload
    if (req.file) {
      // save media info to the database
      const savedMedia = await newMedia(req);

      //add the media URL to the array
      mediaUrls.push(savedMedia.url)
    }
    const userId = req.user.id;
    console.log("mediaUrls:", mediaUrls);
    // create new capsule
    const newCapsule = new Capsule({
      userId,
      title,
      message,
      mediaUrls,
      createdAt,
      openAt: new Date(openAt),
      });
    await newCapsule.save();

    res.status(201).json({
        message: "Capsule created successfully",
        data: newCapsule
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating Capsule", error });
    }
}

// get capsule
export const getCapsule = async (req, res) => {
  const capsuleId = req.params.id;
  console.log("capsuleId:", capsuleId);


   // Validate if the capsuleId is a valid ObjectId
   if (!mongoose.Types.ObjectId.isValid(capsuleId)) {
    return res.status(400).json({ message: "Invalid capsule ID format" });
  }

  try {
    // look for the capsule in the database
    const capsule = await Capsule.findOne({ _id: capsuleId});
    if (!capsule) {
      return res.status(404).json({message: "Capsule not found"});
    }

    // check if capsule can be opened
    const currentDate = new Date();
    if (currentDate < capsule.openAt) {
      return res.status(403).json({
        message: "This capsule is not yet available",
        availableAt: capsule.openAt
      })
    }

    res.status(200).json({
      message: "Capsule retrieved successfully",
      data: capsule
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error retrieving Capsule", error})
  }
}

//get all capsules of the authentified user
export const getUserCapsules = async (req, res) => {
  const userId = req.user.id;

  try {
    const capsules = await Capsule.find({userId});

    res.status(200).json({
      message: "User´s capsules retrieved successfully",
      data: capsules
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error retrieving user´s capsules", error})
  }
}