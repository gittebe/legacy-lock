import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//establish a connection to a MongoDB database with the mongoose.connect() method
const mongoUrl = "mongodb://127.0.0.1:27017/legacy-lock";
mongoose.connect(mongoUrl)

.then(() => {
    console.log('MongoDB succesfully connected!');
  })
  .catch((error) => {
    console.error('Error to connect with MongoDB:', error);
  });