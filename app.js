import express from "express";
import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose";

import db from "./config/db.js";
import indexRouter from "./routes/indexRouter.js";
import authRouter from "./routes/authRouter.js";


const app = express();

const NODE_ENV = process.env.NODE_ENV || 'development';

app.use('/', indexRouter)
app.use('/auth', authRouter)

let port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`running on ${port}`);
    
})