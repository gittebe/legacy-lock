import {Capsule} from "../models/capsuleSchema.js";

// create a new capsule
export const createCapsule = async (req, res) => {
  const {title, message, createdAt} = req.body;

try {
  const newCapsule = new Capsule({
    title,
    message,
    createdAt
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