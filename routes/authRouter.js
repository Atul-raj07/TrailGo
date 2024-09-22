import express from 'express';
const Router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import { body, validationResult } from 'express-validator';

import userModel from '../models/userModel.js';

Router.get('/', (req, res) => {
  res.status(200).json('this is the auth page');
});
Router.post('/',
  [
    body('username')
      .isString()
      .isLength({ min: 2, max: 100 })
      .withMessage('Username must be between 2 and 100 characters.'),
    body('email')
      .isEmail()
      .withMessage('A valid email is required.'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long.'),
  ]
  , (req, res) => {
    const errors = validationResult(req);
    
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
