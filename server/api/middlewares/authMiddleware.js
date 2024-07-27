import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  //read the jwt from the 'jwt' cookie
  token = req.cookie.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, token failed!");
    }
  } else {
    throw new Error("Not Authorized, no token!");
  }
});

//check for admin
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin!");
  }
};

export { authenticate, authorizeAdmin };
