const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ error: error.message });
    });
  };
  
  export default asyncHandler;