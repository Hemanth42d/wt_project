const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports.isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid token. User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports.isFarmer = (req, res, next) => {
  if (req.user.role !== "farmer") {
    return res
      .status(403)
      .json({ message: "Access denied. Farmer role required." });
  }
  next();
};

module.exports.isConsumer = (req, res, next) => {
  if (req.user.role !== "consumer") {
    return res
      .status(403)
      .json({ message: "Access denied. Consumer role required." });
  }
  next();
};
