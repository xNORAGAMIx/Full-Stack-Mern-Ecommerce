import express from "express";
import formidable from "express-formidable";
import { addProduct } from "../controller/productController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, formidable(), addProduct);

export default router;
