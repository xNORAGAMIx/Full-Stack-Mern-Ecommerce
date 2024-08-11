import express from "express";
import formidable from "express-formidable";
import {
  addProduct,
  updateProductDetails,
} from "../controller/productController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, formidable(), addProduct);

router
  .route("/:id")
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails);

export default router;
