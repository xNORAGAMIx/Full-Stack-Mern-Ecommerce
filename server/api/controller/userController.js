import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(`${username}, ${email}, ${password}`);

  //valiadting form for all fields
  if (!username || !email || !password) {
    throw new Error("Please fill all the fields!");
  }

  const userExists = await User.findOne({
    email,
  });

  //validating email existence
  if (userExists) {
    res.status(400);
    throw new Error("Email already exists!");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  console.log(`Hashed Password: ${hashPassword}`);

  //creating new user
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  //saving document to collection
  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data!");
  }
});

export { createUser };
