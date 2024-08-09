import express from "express";
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controller/categoryController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, createCategory);

router
  .route("/:categoryId")
  .delete(authenticate, authorizeAdmin, removeCategory)
  .put(authenticate, authorizeAdmin, updateCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;
