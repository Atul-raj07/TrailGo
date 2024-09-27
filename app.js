import express, { urlencoded } from "express";
import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose";

import db from "./config/db.js";
import indexRouter from "./routes/indexRouter.js";
import userauthRouter from "./routes/user-authRouter.js";
import adminauthRouter from "./routes/admin-authRouter.js"


const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const NODE_ENV = process.env.NODE_ENV || 'development';

app.use('/', indexRouter)
app.use('/userauth', userauthRouter)
app.use('/adminauth', adminauthRouter)

let port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`running on ${port}`);
    
})