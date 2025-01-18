import {Capsule} from "../models/capsuleSchema.js";
import { Media } from "../models/mediaSchema.js";
import { newMedia } from "./mediaController.js";

// create a new capsule
export const createCapsule = async (req, res) => {
  const {title, message, createdAt} = req.body;

  try {
    // Array to store the media URLs if there is media uploaded
    let mediaUrls = [];
    // Check if there is a file upload
    if (req.file) {
      // save media info to the database
      const savedMedia = await newMedia(req);

      // const savedMedia = await newMedia.save();

      //add the media URL to the array
      mediaUrls.push(savedMedia.url)
    }
    // create new capsule
    const newCapsule = new Capsule({
        title,
        message,
        createdAt,
        mediaUrls,
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