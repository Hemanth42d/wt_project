import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">Your cart is empty</div>
          <Link
            to="/products"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
        <p className="text-gray-600">Review your items before checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Cart Items ({items.length})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="p-6">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/80x80?text=Product";
                      }}
                    />

                    <div className="ml-6 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        by {item.farmerName}
                      </p>
                      <p className="text-green-600 font-semibold">
                        ₹{item.price} each
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-lg font-medium text-gray-900 w-20 text-right">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 p-1"
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>
                  Subtotal (
                  {items.reduce((sum, item) => sum + item.quantity, 0)} items)
                </span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-green-600">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/products"
              className="block text-center text-green-600 hover:text-green-700 mt-4"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
