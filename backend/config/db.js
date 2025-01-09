import mongoose from "mongoose";

//establish a connection to a MongoDB database with the mongoose.connect() method
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/legacy-lock";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;
export default mongoose;