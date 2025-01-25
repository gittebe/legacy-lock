import {Capsule} from "../models/capsuleSchema.js";
import { newMedia } from "./mediaController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import mongoose from "mongoose";
import { User } from "../models/userSchema.js";

export const getCreateCapsulePage = (req, res) => {
  res.json({
    message: "Welcome to your page to create capsules",
    user: req.user
  });
};


// create a new capsule
export const createCapsule = async (req, res) => {
  const {title, message, createdAt, openAt, recipientUsername} = req.body;

  try {
    // find recipient by username
    const recipient = await User.findOne({username: recipientUsername});

    if (!recipient) {
      return res.status(404).json({message: "Recipient not found"})
    }

    // the sender ID (authenticated user)
    const userId = req.user.id;
    // the recipients ID
    const recipientId = recipient._id;

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
    console.log("mediaUrls:", mediaUrls);
    // create new capsule
    const newCapsule = new Capsule({
      userId,
      recipients: [recipientId],
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
    const capsule = await Capsule.findById(capsuleId)
      .populate("recipients", "username")
    
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
    // get the capsules the user has created ordered according to the time of creations
    const capsules = await Capsule.find({ userId }).sort({ createdAt: -1 })
      .populate("recipients", "username");

    res.status(200).json({
      message: "User´s capsules retrieved successfully",
      data: capsules
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error retrieving user´s capsules", error})
  }
}

//get the received capsules of the authentified user
export const getReceivedCapsules = async (req, res) => {
  const userId = req.user.id;

  try {
    // get the capsules the user has received ordered according to the set time the capsule opens
    console.log("User ID from request:", userId);
    const receivedCapsules = await Capsule.find({ recipients: new mongoose.Types.ObjectId(userId) })
      .populate("recipients", "username");

    res.status(200).json({
      message: "User´s capsules retrieved successfully",
      data: receivedCapsules
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error retrieving user´s capsules", error})
  }
}
