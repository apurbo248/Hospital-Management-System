import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to verify JWT token
export const protect = async (req, res, next) => {
  let token;

  try {
    // Token comes from Authorization header -> "Bearer token"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request object (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Middleware to check user roles (e.g., admin, doctor, receptionist, patient)
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: `Role (${req.user.role}) not authorized` });
    }
    next();
  };
};
