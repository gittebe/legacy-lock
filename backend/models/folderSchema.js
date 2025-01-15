import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
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

const Folder = mongoose.model("Folder", folderSchema);
export default Folder