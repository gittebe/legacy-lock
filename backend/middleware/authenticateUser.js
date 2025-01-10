import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";

// varifying users identity based on the users access token
export const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  if (user) {
    req.user = user;
    next();
    } else {
    res
      .status(401).json({ loggedOut: true, message: "Invalid or expired token" });
    }
  } catch (error) {
    res.status(500).json({message: "Server error", error});
  }
};