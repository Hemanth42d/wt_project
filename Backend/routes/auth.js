const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOut,
  getProfile,
} = require("../controllers/authController");
const { isLoggedIn } = require("../middleware/auth");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Logout
router.post("/logout", logOut);

// Get current user profile
router.get("/profile", isLoggedIn, getProfile);

module.exports = router;
