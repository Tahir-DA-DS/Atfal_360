const jwt = require("jsonwebtoken");
const User = require("../models/admin_user");
const bcrypt = require('bcrypt')

const RegisterUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.json("User already exists");
    } else {
      const newUser = await User.create({ username, password: hashedPassword });
      // console.log(newUser);
      return res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }


    const token = jwt.sign({ userId: user._id }, process.env.TOKEN, {
      expiresIn: "1h", 
    });

    return res.status(200).json({ token: token, message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {RegisterUser, loginUser};
