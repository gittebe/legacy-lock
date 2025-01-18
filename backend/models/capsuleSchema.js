import mongoose from "mongoose";
import {User} from "./userSchema.js";

const {Schema, model} = mongoose;

const capsuleSchema = new Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
  },
  mediaUrls: [{
    type: String,
    required: false
  }],
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

export const Capsule = model("Capsule", capsuleSchema);