import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const {Schema, model} = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"]
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  accessToken: {
    type: String,
    default: ()=> crypto.randomBytes(128).toString("hex")
  }
})

//hash password before it is saved
userSchema.pre("save", async function (next) {
  if(this.isModified("password")){
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      return next(error);
    } 
  }
  next();
});

//Compare password
userSchema.methods.comparePassword = async function (userPassword) {
  try {
     return await bcrypt.compare(userPassword, this.password);
  } catch {
    throw new Error("Password comparison failed");
  }
};

export const User = model("User", userSchema);