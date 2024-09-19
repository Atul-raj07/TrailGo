import express from "express";
const Router = express.Router()

import userModel from "../models/userModel.js";

Router.get('/', (req, res)=>{
res.status(200).json("this is the auth page")
});
Router.post('/', async(req, res)=>{
    const {username,password,email} = req.body
  const createdUser =  await userModel.create({
        username,
        password,
        email
    })
    res.send(createdUser)  
});

export default Router;