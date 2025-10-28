const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["farmer", "consumer"].includes(role)) {
      return res
        .status(400)
        .json({ message: "Role must be either 'farmer' or 'consumer'" });
    }

    let user = await userModel.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "User already exists with this email" });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        } else {
          let user = await userModel.create({
            name,
            email,
            password: hash,
            role,
          });
          let token = generateToken(user);
          res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Set to false for HTTP (development)
            sameSite: "Lax", // Change from "None" to "Lax" for same-origin
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.status(201).json({
            accessToken: token,
            message: "User Successfully Registered",
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email: email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({
          accessToken: token,
          message: "Successfully Logged In",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      } else {
        res.status(401).json({
          error: true,
          message: "Invalid email or password",
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.logOut = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong during logout" });
  }
};

module.exports.getProfile = async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
