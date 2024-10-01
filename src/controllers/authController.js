const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  /**
   * Check if user exist in the db
   */
  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  /**
   * Creating new user in the db
   */
  const user = await User.create({ name, email, password });

  /**
   * Creating JSON web token for the user
   */
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(201).json({ token });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  /**
   * Check if user exist
   */
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  /**
   * Check password match or not
   */

  const passwordMatch = await user.matchPassword(password);

  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  /**
   * Creating JSON web token for the user
   */
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).json({ token });
};

module.exports = { signIn, signUp };
