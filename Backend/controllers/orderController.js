const orderModel = require("../models/order-model");
const productModel = require("../models/product-model");

// Create order (consumers only)
module.exports.createOrder = async (req, res) => {
  try {
    const { products, deliveryAddress, contactNumber } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products array is required" });
    }

    if (!deliveryAddress || !contactNumber) {
      return res
        .status(400)
        .json({ message: "Delivery address and contact number are required" });
    }

    let totalAmount = 0;
    const orderProducts = [];

    // Validate and calculate total for each product
    for (const item of products) {
      const product = await productModel.findById(item.productID);

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.productID}` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient quantity for product: ${product.name}. Available: ${product.quantity}, Requested: ${item.quantity}`,
        });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderProducts.push({
        productID: item.productID,
        quantity: item.quantity,
        price: product.price,
      });

      // Update product quantity
      await productModel.findByIdAndUpdate(item.productID, {
        $inc: { quantity: -item.quantity },
      });
    }

    // Get seller ID from the first product (assuming single farmer orders for now)
    const firstProduct = await productModel.findById(products[0].productID);

    const order = await orderModel.create({
      buyerID: req.user._id,
      sellerID: firstProduct.farmerID,
      products: orderProducts,
      totalAmount,
      deliveryAddress,
      contactNumber,
    });

    const populatedOrder = await orderModel
      .findById(order._id)
      .populate("buyerID", "name email")
      .populate("sellerID", "name email")
      .populate("products.productID", "name image");

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: populatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get consumer's orders
module.exports.getConsumerOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyerID: req.user._id })
      .populate("sellerID", "name email")
      .populate("products.productID", "name image")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get farmer's orders (orders received)
module.exports.getFarmerOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ sellerID: req.user._id })
      .populate("buyerID", "name email")
      .populate("products.productID", "name image")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status (farmers only)
module.exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    if (
      !["pending", "confirmed", "shipped", "delivered", "cancelled"].includes(
        status
      )
    ) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the order belongs to the logged-in farmer
    if (order.sellerID.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({
          message: "Access denied. You can only update your own orders.",
        });
    }

    const updatedOrder = await orderModel
      .findByIdAndUpdate(
        orderId,
        { status, updatedAt: Date.now() },
        { new: true }
      )
      .populate("buyerID", "name email")
      .populate("products.productID", "name image");

    res.json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single order
module.exports.getOrder = async (req, res) => {
  try {
    const order = await orderModel
      .findById(req.params.id)
      .populate("buyerID", "name email")
      .populate("sellerID", "name email")
      .populate("products.productID", "name image");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the user is either the buyer or seller
    if (
      order.buyerID._id.toString() !== req.user._id.toString() &&
      order.sellerID._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied." });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
