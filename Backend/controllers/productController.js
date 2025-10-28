const productModel = require("../models/product-model");

// Get all products (for consumers)
module.exports.getAllProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (category && category !== "all") {
      filter.category = category;
    }

    const products = await productModel
      .find(filter)
      .populate("farmerID", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
module.exports.getProduct = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("farmerID", "name email");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get farmer's products
module.exports.getFarmerProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({ farmerID: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create product (farmers only)
module.exports.createProduct = async (req, res) => {
  try {
    const { name, price, quantity, category, image, description } = req.body;

    if (!name || !price || !quantity || !category || !image) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const product = await productModel.create({
      name,
      price,
      quantity,
      category,
      image,
      description,
      farmerID: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product (farmers only)
module.exports.updateProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product belongs to the logged-in farmer
    if (product.farmerID.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({
          message: "Access denied. You can only update your own products.",
        });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product (farmers only)
module.exports.deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product belongs to the logged-in farmer
    if (product.farmerID.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({
          message: "Access denied. You can only delete your own products.",
        });
    }

    await productModel.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
