import jwt from "jsonwebtoken";


// ==============================
// VERIFY TOKEN
// ==============================

export const verifyToken = async (req, res, next) => {
  try {
    // Get JWT from HttpOnly cookie
    const token = req.cookies.token;

    // No token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Please login first.",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store decoded admin information
    req.admin = decoded;

    // Continue
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};


// ==============================
// AUTHORIZE ROLE
// ==============================

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {

    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    next();
  };
};