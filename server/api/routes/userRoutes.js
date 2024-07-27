import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
} from "../controller/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

router.route("/profile").get(authenticate, getCurrentUserProfile);

//Login route
router.route("/auth").post(loginUser);
//Logout route
router.route("/logout").post(logoutUser);

export default router;
