import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const ConsumerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/orders/consumer/my-orders"
      );
      setOrders(response.data.orders);
      setError(null);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return <Loading message="Loading your orders..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          My Orders - {user?.name}
        </h1>
        <p className="text-gray-600">Track your orders and order history</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
            You haven't placed any orders yet.
          </div>
          <a
            href="/products"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order._id.slice(-8)}
                  </h3>
                  <p className="text-gray-600">
                    Farmer: {order.sellerID?.name} ({order.sellerID?.email})
                  </p>
                  <p className="text-gray-600">
                    Ordered: {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                  <p className="text-2xl font-bold text-green-600 mt-2">
                    ₹{order.totalAmount}
                  </p>
                </div>
              </div>

              {/* Products */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  Products Ordered:
                </h4>
                <div className="space-y-2">
                  {order.products.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.productID?.image}
                          alt={item.productID?.name}
                          className="w-12 h-12 object-cover rounded mr-3"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/48x48?text=?";
                          }}
                        />
                        <div>
                          <p className="font-medium">{item.productID?.name}</p>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Details */}
              <div className="p-3 bg-gray-50 rounded">
                <h4 className="font-medium text-gray-900 mb-2">
                  Delivery Details:
                </h4>
                <p className="text-gray-700">
                  <strong>Address:</strong> {order.deliveryAddress}
                </p>
                <p className="text-gray-700">
                  <strong>Contact:</strong> {order.contactNumber}
                </p>
              </div>

              {/* Order Status Timeline */}
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium text-gray-900 mb-3">
                  Order Progress:
                </h4>
                <div className="flex items-center space-x-4">
                  <div
                    className={`flex items-center ${
                      ["pending", "confirmed", "shipped", "delivered"].includes(
                        order.status
                      )
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${
                        [
                          "pending",
                          "confirmed",
                          "shipped",
                          "delivered",
                        ].includes(order.status)
                          ? "bg-green-600"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <span className="ml-2 text-sm">Pending</span>
                  </div>

                  <div
                    className={`w-8 h-1 ${
                      ["confirmed", "shipped", "delivered"].includes(
                        order.status
                      )
                        ? "bg-green-600"
                        : "bg-gray-300"
                    }`}
                  ></div>

                  <div
                    className={`flex items-center ${
                      ["confirmed", "shipped", "delivered"].includes(
                        order.status
                      )
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${
                        ["confirmed", "shipped", "delivered"].includes(
                          order.status
                        )
                          ? "bg-green-600"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <span className="ml-2 text-sm">Confirmed</span>
                  </div>

                  <div
                    className={`w-8 h-1 ${
                      ["shipped", "delivered"].includes(order.status)
                        ? "bg-green-600"
                        : "bg-gray-300"
                    }`}
                  ></div>

                  <div
                    className={`flex items-center ${
                      ["shipped", "delivered"].includes(order.status)
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${
                        ["shipped", "delivered"].includes(order.status)
                          ? "bg-green-600"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <span className="ml-2 text-sm">Shipped</span>
                  </div>

                  <div
                    className={`w-8 h-1 ${
                      order.status === "delivered"
                        ? "bg-green-600"
                        : "bg-gray-300"
                    }`}
                  ></div>

                  <div
                    className={`flex items-center ${
                      order.status === "delivered"
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-600"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <span className="ml-2 text-sm">Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConsumerOrders;
