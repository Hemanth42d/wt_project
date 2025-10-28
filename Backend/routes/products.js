const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  getFarmerProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { isLoggedIn, isFarmer } = require("../middleware/auth");

// Public routes
router.get("/", getAllProducts); // Get all products with optional search/filter
router.get("/:id", getProduct); // Get single product

// Protected routes - Farmer only
router.get("/farmer/my-products", isLoggedIn, isFarmer, getFarmerProducts); // Get farmer's products
router.post("/", isLoggedIn, isFarmer, createProduct); // Create product
router.put("/:id", isLoggedIn, isFarmer, updateProduct); // Update product
router.delete("/:id", isLoggedIn, isFarmer, deleteProduct); // Delete product

module.exports = router;
