const jwt = require("jsonwebtoken");
const User = require("../models/user");

// ================= Protect Middleware =================
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        status: "failed",
        message: "Not authorized. No token provided.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      _id: decoded.id,
    };

    // Debug
    console.log("Decoded User:", req.user);

    next();
  } catch (error) {
    console.log("Protect Error:", error.message);

    return res.status(401).json({
      status: "failed",
      message: error.message || "Not authorized.",
    });
  }
};

// ================= Admin Middleware =================
const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user?._id).select("role email");

    console.log("Admin User:", user);

    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "Not authorized",
      });
    }

    console.log("Role:", user.role);

    if (user.role !== "admin") {
      return res.status(403).json({
        status: "failed",
        message: "Admin access required",
      });
    }

    next();
  } catch (error) {
    console.log("Admin Error:", error.message);

    return res.status(401).json({
      status: "failed",
      message: error.message || "Not authorized",
    });
  }
};

module.exports = {
  protect,
  admin,
};