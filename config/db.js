import mongoose from "mongoose";
 import dotenv from "dotenv";
 dotenv.config()

 const NODE_ENV = process.env.NODE_ENV || 'development';

const MONGODB_URI = NODE_ENV === 'production' 
    ? process.env.MONGODB_URI_PROD 
    : process.env.MONGODB_URI_DEV;

mongoose.connect(MONGODB_URI,{})
.then( ()=>{
    console.log("Connect to Mongoose")}) 
.catch((err) =>{ 
    console.error(err.message)
});

export default mongoose.connection