import { User } from "../models/userSchema.js";

// varifying users identity based on the users access token
export const authenticateUser = async (req, res, next) => {
  //get the token from the authorization header
  const token = req.header("Authorization");
  // Check if a token exists
  if(!token) {
    return res.status(401).json({message: "No token provided"});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //search for user with the access token
    const user = await User.findOne({accessToken: token});
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