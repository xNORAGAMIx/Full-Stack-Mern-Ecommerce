import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(`${username}, ${email}, ${password}`);

  //validating form for all fields
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

const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json({
    users: allUsers,
  });
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  //user exists
  if (user) {
    //if username passed as parameterc change it
    user.username = req.body.username || user.username;

    //email passed in request body
    if (req.body.email) {
      const email = req.body.email;

      //check user email passed in body already exists or not
      const userEmail = await User.findOne({ email });

      //new email passed in body already exists
      if (userEmail) {
        throw new Error("Email already exists!");
      }

      //new email passed does not exist, hence change it
      user.email = email;
    }

    if (req.body.password) {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      console.log(`Hashed Password: ${hashPassword}`);

      user.password = hashPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user!");
    }
    await User.deleteOne({ _id: user._id });
    res.json({
      message: "User deleted!",
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    //username if passed in request change it
    user.username = req.body.username || user.username;

    //email
    if (req.body.email) {
      const email = req.body.email;

      const userEmail = await User.findOne({ email });

      if (userEmail) {
        throw new Error("Email already exists!");
      }

      user.email = email;
    }

    //admin
    console.log(req.body.isAdmin);
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
};
