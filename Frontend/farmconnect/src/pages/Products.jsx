import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Loading from "../components/Loading";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const { user } = useAuth();
  const { addToCart } = useCart();

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "vegetables", label: "Vegetables" },
    { value: "fruits", label: "Fruits" },
    { value: "grains", label: "Grains" },
    { value: "dairy", label: "Dairy" },
    { value: "herbs", label: "Herbs" },
    { value: "other", label: "Other" },
  ];

  // Handle URL parameters on component mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (
      categoryFromUrl &&
      categories.some((cat) => cat.value === categoryFromUrl)
    ) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (selectedCategory && selectedCategory !== "all")
        params.append("category", selectedCategory);

      const response = await axios.get(`${API_BASE_URL}/products?${params}`);
      setProducts(response.data.products);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please login to add products to cart");
      return;
    }

    if (user.role !== "consumer") {
      alert("Only consumers can add products to cart");
      return;
    }

    addToCart(product, 1);
    alert("Product added to cart!");
  };

  if (loading) return <Loading message="Loading products..." />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Fresh Farm Products
            </h1>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Discover premium quality produce directly from local farmers.
              Fresh, organic, and sustainably grown just for you.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6 items-end">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Products
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search for fresh produce..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <div className="w-full lg:w-64">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={fetchProducts}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>Refresh</span>
              </div>
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {products.length}
            </span>{" "}
            products
            {(searchTerm || selectedCategory !== "all") && (
              <span>
                {" "}
                for {searchTerm && `"${searchTerm}"`}
                {searchTerm && selectedCategory !== "all" && " in "}
                {selectedCategory !== "all" &&
                  `${
                    categories.find((c) => c.value === selectedCategory)?.label
                  }`}
              </span>
            )}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 flex items-center space-x-3">
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <svg
                className="w-24 h-24 text-gray-300 mx-auto mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 9h.01M15 9h.01M9 15h.01M15 15h.01"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Products Found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search criteria or browse all categories"
                  : "Check back soon for fresh products from our farmers"}
              </p>
              {(searchTerm || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-soft hover:shadow-medium overflow-hidden transition-all duration-300 group hover-lift animate-fade-in border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300/059669/ffffff?text=Fresh+Produce";
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                      {product.category}
                    </span>
                  </div>
                  {product.quantity === 0 && (
                    <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white font-semibold px-4 py-2 rounded-xl">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {product.name}
                  </h3>

                  {product.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-emerald-600">
                        ₹{product.price}
                      </span>
                      <span className="text-sm text-gray-500">per unit</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Available</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {product.quantity} units
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-emerald-600 text-xs font-semibold">
                          {product.farmerID?.name?.charAt(0)?.toUpperCase() ||
                            "F"}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        by {product.farmerID?.name || "Local Farmer"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {user &&
                    user.role === "consumer" &&
                    product.quantity > 0 ? (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9m4.5-9h6m0 0l1.5 9M9 19.5h6"
                          />
                        </svg>
                        <span>Add to Cart</span>
                      </button>
                    ) : (
                      <div className="w-full bg-gray-100 text-gray-500 px-4 py-3 rounded-xl text-center font-medium">
                        {!user
                          ? "Login to Purchase"
                          : user.role !== "consumer"
                          ? "View Only"
                          : "Out of Stock"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
