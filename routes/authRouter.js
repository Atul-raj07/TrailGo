import express from 'express';
const Router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import { configDotenv } from 'dotenv';

import userModel from '../models/userModel.js';

Router.get('/', (req, res) => {
  res.status(200).json('this is the auth page');
});
Router.post('/', (req, res) => {
  try {
    const { username, password, email } = req.body;
    bcrypt.genSalt(15, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const createdUser = await userModel.create({
          username,
          password: hash,
          email,
        });
        console.log(createdUser);

        res.status(201).json('usercreated successfully');
      });
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.send("validation error");
    } else {
      res.send("something wrong");
    }
  }
});
Router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  console.log(user);
  res.status(200).json(user);
});
Router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json('logged out successfully');
});

export default Router;
