import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";

// varifying users identity based on the users access token
export const authenticateUser = async (req, res, next) => {
  try{
    //extract toke from authorization header
    const token = req.header("Authorization")?.split("")[1];

    if(!token){
      return res.status(401).json({loggedOut: true, message: "No token provided"});
    }

    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {

      return res.status(401).json({ loggedOut: true, message: "User not found" });
    }

    // Attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ loggedOut: true, message: "Invalid or expired token", error });
  }
};