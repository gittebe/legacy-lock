import {Capsule} from "../models/capsuleSchema.js";
import { newMedia } from "./mediaController.js";

// create a new capsule
export const createCapsule = async (req, res) => {
  const {title, message, createdAt} = req.body;

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