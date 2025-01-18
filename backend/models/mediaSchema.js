import mongoose from "mongoose";

const {Schema, model} = mongoose;

const mediaSchema = new Schema({
  url: { 
    type: String,
     required: true },
  public_id: { 
    type: String, 
    required: true },
});

export const Media = model("Media", mediaSchema);  