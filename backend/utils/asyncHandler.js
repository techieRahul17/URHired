/**
 * Async Wrapper for Route Handlers
 * Catches any unhandled promise rejections and passes them to the error handling middleware
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;
