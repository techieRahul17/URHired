const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/userModel");

const authMiddleware = asyncHandler(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new CustomError('You are not logged in. Please log in to get access.', 401));
  }

  // 2) Verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new CustomError('The user belonging to this token no longer exists.', 401));
  }

  // 4) Grant access to protected route
  req.user = {
    id: currentUser._id,
    name: currentUser.name,
    email: currentUser.email
  };
  next();
});

module.exports = authMiddleware;