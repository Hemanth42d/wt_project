const express = require("express");
const router = express.Router();
const {
  createOrder,
  getConsumerOrders,
  getFarmerOrders,
  updateOrderStatus,
  getOrder,
} = require("../controllers/orderController");
const { isLoggedIn, isFarmer, isConsumer } = require("../middleware/auth");

// Consumer routes
router.post("/", isLoggedIn, isConsumer, createOrder); // Create order
router.get("/consumer/my-orders", isLoggedIn, isConsumer, getConsumerOrders); // Get consumer's orders

// Farmer routes
router.get("/farmer/received-orders", isLoggedIn, isFarmer, getFarmerOrders); // Get farmer's received orders
router.put("/:id/status", isLoggedIn, isFarmer, updateOrderStatus); // Update order status

// Common routes
router.get("/:id", isLoggedIn, getOrder); // Get single order (for both buyer and seller)

module.exports = router;
