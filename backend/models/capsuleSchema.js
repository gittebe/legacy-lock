import mongoose from "mongoose";

const capsuleSchema = new mongoose.Schema({
  // userId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //     required: true
  //   },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
  },
  url: {
    type: String,
  },
  public_id: {
    type: String,
    required: false
  },
  recource_type: {
    type: String,
    required: false
    },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

// Validation for the minimum required: either a message, or an url for image / video
capsuleSchema.pre("validate", function(next) {
  if (!this.message && !this.url) {
  return next(new Error("Either a message or an image/video (url) must be provided."))
  }
  next();
})
const Capsule = mongoose.model("Capsule", capsuleSchema);
export default Capsule