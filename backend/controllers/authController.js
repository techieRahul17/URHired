const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");
const asyncHandler = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return next(new CustomError("Please provide name, email, and password", 400));
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new CustomError("User already exists with this email", 400));
  }

  // Password will be automatically hashed by the pre-save middleware
  const newUser = await User.create({ name, email, password });

  // Generate JWT token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { 
    expiresIn: "1d" 
  });

  res.status(201).json({
    message: "User registered successfully",
    token: token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email
    }
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return next(new CustomError("Please provide email and password", 400));
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("Invalid email or password", 401));
  }

  // Check if password is correct
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new CustomError("Invalid email or password", 401));
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
    expiresIn: "1d" 
  });

  res.status(200).json({
    message: "Login successful",
    token: token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});

const verifyToken = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    message: "Token is valid",
    user: req.user
  });
});

module.exports = { register, login, verifyToken };
