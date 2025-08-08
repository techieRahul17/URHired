const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const CustomError = require("../utils/customError");
const asyncHandler = require("../utils/asyncHandler");
const sendEmail = require("../utils/email");

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

  // Generate email verification token
  const verificationToken = newUser.generateEmailVerificationToken();
  await newUser.save({ validateBeforeSave: false });

  try {
    // Create verification URL
    const verificationURL = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

    // Email message
    const message = `
      Welcome to URHired!
      
      Please verify your email address by clicking on the following link:
      ${verificationURL}
      
      This link will expire in 10 minutes.
      
      If you did not create an account, please ignore this email.
    `;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to URHired!</h2>
        <p>Thank you for creating an account with us. Please verify your email address to complete your registration.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationURL}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email Address</a>
        </div>
        <p>If the button doesn't work, you can also copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #28a745;">${verificationURL}</p>
        <p><strong>Note:</strong> This link will expire in 10 minutes.</p>
        <p>If you did not create an account, please ignore this email.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">This is an automated email from URHired. Please do not reply to this email.</p>
      </div>
    `;

    await sendEmail({
      email: newUser.email,
      subject: "URHired - Verify Your Email Address",
      message,
      html,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully. Please check your email to verify your account.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        emailVerified: newUser.emailVerified
      }
    });
  } catch (error) {
    // If email sending fails, delete the user and return error
    await User.findByIdAndDelete(newUser._id);
    return next(new CustomError("User registration failed. Could not send verification email.", 500));
  }
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

  // Check if email is verified
  if (!user.emailVerified) {
    return next(new CustomError("Please verify your email address before logging in", 401));
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
    expiresIn: "1d" 
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    token: token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified
    }
  });
});

const verifyToken = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    message: "Token is valid",
    user: req.user
  });
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  // Validate email
  if (!email) {
    return next(new CustomError("Please provide your email", 400));
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("User not found with this email", 404));
  }

  // Generate reset token
  const resetToken = user.generateResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    // Create reset URL using frontend URL
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Email message
    const message = `
      You are receiving this email because you (or someone else) has requested a password reset for your URHired account.
      
      Please click on the following link to reset your password:
      ${resetURL}
      
      If you did not request this, please ignore this email and your password will remain unchanged.
      
      This link will expire in 10 minutes.
    `;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>You are receiving this email because you (or someone else) has requested a password reset for your URHired account.</p>
        <p>Please click on the following button to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetURL}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
        </div>
        <p>If the button doesn't work, you can also copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #007bff;">${resetURL}</p>
        <p><strong>Note:</strong> This link will expire in 10 minutes.</p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">This is an automated email from URHired. Please do not reply to this email.</p>
      </div>
    `;

    await sendEmail({
      email: user.email,
      subject: "URHired Password Reset Request",
      message,
      html,
    });

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    user.clearResetToken();
    await user.save({ validateBeforeSave: false });
    
    return next(new CustomError("Email could not be sent. Please try again later.", 500));
  }
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  // Validate password
  if (!password) {
    return next(new CustomError("Please provide a new password", 400));
  }

  if (password.length < 6) {
    return next(new CustomError("Password must be at least 6 characters long", 400));
  }

  // Hash the token to match with stored hashed token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  // Find user with matching token and check if token hasn't expired
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(new CustomError("Invalid token or token has expired", 400));
  }

  // Update password and clear reset token fields
  user.password = password;
  user.clearResetToken();
  await user.save();

  // Generate new JWT token for automatic login
  const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
    expiresIn: "1d" 
  });

  res.status(200).json({
    success: true,
    message: "Password reset successful",
    token: jwtToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});

const verifyEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  // Hash the token to match with stored hashed token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  // Find user with matching token and check if token hasn't expired
  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(new CustomError("Invalid token or token has expired", 400));
  }

  // Mark email as verified and clear verification token
  user.emailVerified = true;
  user.clearEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  // Generate JWT token for automatic login
  const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
    expiresIn: "1d" 
  });

  res.status(200).json({
    success: true,
    message: "Email verified successfully. You are now logged in.",
    token: jwtToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified
    }
  });
});

const resendVerificationEmail = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  // Validate email
  if (!email) {
    return next(new CustomError("Please provide your email", 400));
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("User not found with this email", 404));
  }

  // Check if email is already verified
  if (user.emailVerified) {
    return next(new CustomError("Email is already verified", 400));
  }

  // Generate new verification token
  const verificationToken = user.generateEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  try {
    // Create verification URL
    const verificationURL = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

    // Email message
    const message = `
      Email Verification - URHired
      
      Please verify your email address by clicking on the following link:
      ${verificationURL}
      
      This link will expire in 10 minutes.
      
      If you did not request this, please ignore this email.
    `;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Email Verification</h2>
        <p>Please verify your email address to complete your registration.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationURL}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email Address</a>
        </div>
        <p>If the button doesn't work, you can also copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #28a745;">${verificationURL}</p>
        <p><strong>Note:</strong> This link will expire in 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">This is an automated email from URHired. Please do not reply to this email.</p>
      </div>
    `;

    await sendEmail({
      email: user.email,
      subject: "URHired - Verify Your Email Address",
      message,
      html,
    });

    res.status(200).json({
      success: true,
      message: "Verification email sent successfully",
    });
  } catch (error) {
    user.clearEmailVerificationToken();
    await user.save({ validateBeforeSave: false });
    
    return next(new CustomError("Email could not be sent. Please try again later.", 500));
  }
});

module.exports = { register, login, verifyToken, forgotPassword, resetPassword, verifyEmail, resendVerificationEmail };
