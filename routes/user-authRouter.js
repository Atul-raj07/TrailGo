import express from 'express';
const Router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
// import { body, validationResult } from 'express-validator';

import userModel from '../models/userModel.js';

Router.get('/', (req, res) => {
  res.status(200).json('this is the auth page');
});
Router.post('/', (req, res) => {
  // const errors = validationResult(req);

  try {
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      res.status(400).json('missing data');
      return;
    }
    bcrypt.genSalt(15, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const createdUser = await userModel.create({
          username,
          password: hash,
          email,
        });
        var token = jwt.sign(
          { username: createdUser.username, email: createdUser.email },
          process.env.JWT_SECRET
        );
        res.cookie('token', token);
        console.log(token);
        res.status(201).json(`usercreated successfully ${token}`);
      });
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.send('validation error');
    } else {
      res.send('something wrong');
    }
  }
});
Router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select('+password');
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const token = jwt.sign(
        { email: user.email, username: user.username },
        process.env.JWT_SECRET
      );
      res.cookie('token', token);
      res.status(200).json('user loggedin sucessfully');
    } else {
      res.send('incorrect password');
    }
  });
});
Router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json('logged out successfully');
});

export default Router;
