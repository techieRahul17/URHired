const CustomError = require('../utils/customError');

/**
 * Handle Cast Error (Invalid MongoDB ObjectId)
 */
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new CustomError(message, 400);
};

/**
 * Handle Duplicate Field Error (MongoDB E11000)
 */
const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `${field} '${value}' already exists. Please use another value.`;
  return new CustomError(message, 400);
};

/**
 * Handle Validation Error (Mongoose validation)
 */
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Validation Error: ${errors.join('. ')}`;
  return new CustomError(message, 400);
};

/**
 * Handle JWT Error (Invalid token)
 */
const handleJWTError = () => {
  return new CustomError('Invalid token. Please log in again.', 401);
};

/**
 * Handle JWT Expired Error
 */
const handleJWTExpiredError = () => {
  return new CustomError('Your token has expired. Please log in again.', 401);
};

/**
 * Global Error Handling Middleware
 * Catches all errors and sends consistent JSON responses
 */
const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method
  });

  // Handle specific error types
  if (err.name === 'CastError') {
    error = handleCastError(err);
  }
  
  if (err.code === 11000) {
    error = handleDuplicateFieldsDB(err);
  }
  
  if (err.name === 'ValidationError') {
    error = handleValidationError(err);
  }
  
  if (err.name === 'JsonWebTokenError') {
    error = handleJWTError();
  }
  
  if (err.name === 'TokenExpiredError') {
    error = handleJWTExpiredError();
  }

  // Set default values
  const statusCode = error.statusCode || 500;
  const message = error.isOperational ? error.message : 'Something went wrong';

  // Send error response
  res.status(statusCode).json({
    error: message,
    statusCode: statusCode
  });
};

module.exports = globalErrorHandler;
