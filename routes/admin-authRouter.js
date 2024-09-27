import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const Router = express.Router();


import adminModel from "../models/adminModel.js"
import { token } from "morgan";

Router.get("/",(req,res)=>{
    res.send("this is admin login page")
})
Router.post("/",(req,res)=>{
    try{
        const {username,password,email} = req.body
        if(!username || !password || !email){
            res.send("username password evething required bharo pahle")
        }else{
            bcrypt.genSalt(15,(err,salt)=>{
                if (err) {
                    return res.status(500).send("Error generating salt");
                  }
                bcrypt.hash(password, salt, async(err,hash)=>{
                    if (err) {
                        return res.status(500).send("Error hashing password");
                      }
                    const createdAdmin = await adminModel.create({
                        username,
                        password:hash,
                        email
                    })
          const      token   =  jwt.sign({username:createdAdmin.username,email:createdAdmin.email},process.env.JWT_SECRET)
          res.cookie("token",token)
          
          res.send("loogged")
                })
            })
            
        }
         
    }catch(err){
        res.send(err)
    }
    
})
Router.post("/login",async (req,res)=>{
    try{
        const {email,password} = req.body
        const admin = await adminModel.findOne({email}).select("+password")
        if(!admin){
           return res.send("try a chips you love")
        }
       await bcrypt.compare(password,admin.password,(err,match)=>{
            if(err){
              return  res.send(err)
            }
            if(!match){
              return  res.send("eat some almonds")
            }
        const token =    jwt.sign({email:admin.email,username:admin.username},process.env.JWT_SECRET)
        res.cookie("token",token)
        return  res.send("logged in")
        })
    }catch(err){
      return  res.send(err)
    }
    
})

Router.post("/logout",(req,res)=>{
res.clearCookie("token")
res.send("logout")
})

export default Router