import express from "express";
const Router = express.Router()

Router.get('/', (req, res)=>{
res.status(200).json("this is the auth page")
});

export default Router;