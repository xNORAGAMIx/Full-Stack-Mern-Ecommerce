//importing packages
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//importing utils
import { connectDB } from "../config/dbConnection.js";

import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

//creating instance
dotenv.config();
connectDB();
const app = express();

//starting server
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
