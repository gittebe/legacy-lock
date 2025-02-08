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
  const { title, message, createdAt, openAt, recipientUsername } = req.body;

  try {
    const recipient = await User.findOne({ username: recipientUsername });
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    const userId = req.user.id;
    const recipientId = recipient._id;

    let mediaUrls = [];
    if (req.file) {
      const savedMedia = await newMedia(req);
      mediaUrls.push(savedMedia.url);
    }
    console.log("mediaUrls:", mediaUrls);

    const openAtDate = new Date(openAt); 
    if (isNaN(openAtDate)) {
      return res.status(400).json({ message: "Invalid openAt date" });
    }
    const openAtUTC = openAtDate.toISOString();

    console.log("Received openAt (local):", openAt); 
    console.log("Converted openAtUTC (UTC):", openAtUTC); 

    const newCapsule = new Capsule({
      userId,
      recipients: [recipientId],
      title,
      message,
      mediaUrls,
      createdAt,
      openAt: openAtUTC, 
    });
    await newCapsule.save();

    res.status(201).json({
      message: "Capsule created successfully",
      data: newCapsule,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating Capsule", error });
  }
};

// get capsule
export const getCapsule = async (req, res) => {
  const capsuleId = req.params.id; 
  console.log("Backend: Received capsule ID:", capsuleId);

   // Validate if the capsuleId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(capsuleId)) {
    console.error("Backend: Invalid capsule ID format:", capsuleId);
    return res.status(400).json({ message: "Invalid capsule ID format" });
  }

  try {
    // look for the capsule in the database
    console.log("Backend: Looking for capsule in database...");
    const capsule = await Capsule.findById(capsuleId)
      .populate("recipients", "username")
    
    if (!capsule) {
      console.error("Backend: Capsule not found for ID:", capsuleId);
      return res.status(404).json({message: "Capsule not found"});
    }

    console.log("Backend: Capsule found:", capsule);

    // check if capsule can be opened
    /* const currentDate = new Date();
    console.log("Backend: Current date:", currentDate);
    console.log("Backend: Capsule openAt:", capsule.openAt);

    if (currentDate < capsule.openAt) {
      console.log("Backend: Capsule is not yet available.");
      return res.status(403).json({
        message: "This capsule is not yet available",
        availableAt: capsule.openAt
      })
    }*/

    res.status(200).json({
      message: "Capsule retrieved successfully",
      data: capsule
    })
  } catch (error) {
    console.error("Backend: Error retrieving capsule:", error);
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

//get media Urls
export const getMediaUrls = async (req, res) => {
  const { userId } = req.params;

  // Validate user ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid User ID' });
  }

  try {
    const capsules = await Capsule.find({ userId }).select('mediaUrls createdAt');

    if (capsules.length === 0) {
      return res.status(404).json({ message: 'No capsules found for this user' });
    }

    const mediaWithDates = capsules
      .flatMap(capsule => 
        capsule.mediaUrls.map(mediaUrl => ({
          mediaUrl,
          createdAt: capsule.createdAt
        }))
      );

    if (mediaWithDates.length === 0) {
      return res.status(404).json({ message: 'No media found for this user' });
    }

    const recentMedia = mediaWithDates
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);

    const recentMediaUrls = recentMedia.map(media => media.mediaUrl);

    res.status(200).json(recentMediaUrls);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching media URLs', error: error.message });
  }
};