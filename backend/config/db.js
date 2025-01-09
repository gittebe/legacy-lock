import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//establish a connection to a MongoDB database with the mongoose.connect() method
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/legacy-lock";
mongoose.connect(mongoUrl)
.then(() => console.log("MongoDB is connected"))
.catch((err)=> console.log("error to connect MongoDB", err));

mongoose.Promise = Promise;
export default mongoose;