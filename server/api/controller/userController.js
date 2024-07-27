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

  //hashing password
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
    //creating token and setting cookie
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

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //validating form for all fields
  if (!email || !password) {
    throw new Error("Please enter all fields");
  }

  //checking for user existence
  const user = await User.findOne({ email });

  //email not in database
  if (!user) {
    throw new Error("Email does not exist!");
  }

  //user exists
  if (user) {
    const hashPassword = await bcrypt.compare(password, user.password);

    //valid password
    if (hashPassword) {
      createToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      });

      return;
    } else {
      throw new Error("Wrong credentials!");
    }
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt").status(200).json({
    message: "Logged out successfully!",
  });
});

export { createUser, loginUser, logoutUser };
