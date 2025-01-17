import mongoose from "mongoose";
import User from "./userSchema.js"

const folderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
  folderName: {
    type: String,
    required: true
  },
  media: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Capsule"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Folder = mongoose.model("Folder", folderSchema);