
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

//admin token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGMyZWVjODU5YzUxMWQ4Y2FlNjVlNjIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTA0OTY3MTJ9.2_VZqWHe1_-xoOCWdz_XojZOI4WVDUz10hIa4Ka-qbA
// User login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid ' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ _id: user._id}, SECRET_KEY);
     
    // Return the token to the client
    res.json({ token,role:user.role });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};


// User registration
exports.register = async (req, res) => {
  const { username, password } = req.body;
console.log(username)
  try {
    // Check if the username is already taken

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }
console.log(existingUser)
  
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role: 'admin', 
    });
    await newUser.save();
    console.log(newUser)

  
    const token = jwt.sign({ _id: newUser._id, role: newUser.role }, SECRET_KEY);

  
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

