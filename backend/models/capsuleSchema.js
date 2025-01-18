import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const {Schema, model} = mongoose;

const capsuleSchema = new Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
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
  openAt: {
    type: Date,
    required: false
  },
  // link: {
  //   type: String,
  //   default: () => uuidv4(),
  // }
});

export const Capsule = model("Capsule", capsuleSchema);