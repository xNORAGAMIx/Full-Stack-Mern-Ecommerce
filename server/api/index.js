//importting packages
import express from "express";
import dotenv from "dotenv";

//creating instance
dotenv.config();
const app = express();

//starting server
const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
})
