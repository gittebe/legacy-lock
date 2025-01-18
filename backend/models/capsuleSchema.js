import mongoose from "mongoose";
import User from "./userSchema.js";

const {Schema, model} = mongoose;

const capsuleSchema = new Schema({
  // userId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //     required: false
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
    required: false
  },
  public_id: {
    type: String,
    required: false
  },
  resource_type: {
    type: String,
    required: false
    },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

// Validation for the minimum required: either a message, or an url for image / video
// capsuleSchema.pre("validate", function(next) {
//   if (!this.message && !this.url) {
//   return next(new Error("Either a message or an image/video (url) must be provided."))
//   }
//   next();
// })

export const Capsule = model("Capsule", capsuleSchema);
