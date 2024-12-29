import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userSchema.js";

export const authenticate = asyncHandler(async (req, res, next) => {
   
    const token = req.cookies.jwt;

    if(!token){
        const error = new Error("Unauthorized");
        error.statusCode = 401; // Unauthorized
        throw error;
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
   if (decoded) {
    try {
        req.user = await User.findById(decoded.userID).select("-password");
        next();
    } catch (error) {
        res.status(401).json({message: error.message});
    }

   } else {
        res.status(500).json({message: "Server Error"});
   }
})



export const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send("Not authorized as an admin.");
    }
  };