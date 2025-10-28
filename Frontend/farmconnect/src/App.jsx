import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import FarmerDashboard from "./pages/FarmerDashboard";
import FarmerOrders from "./pages/FarmerOrders";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ConsumerOrders from "./pages/ConsumerOrders";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected products route - requires authentication */}
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
              />

              {/* Protected routes for farmers */}
              <Route
                path="/farmer/dashboard"
                element={
                  <ProtectedRoute requiredRole="farmer">
                    <FarmerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/farmer/orders"
                element={
                  <ProtectedRoute requiredRole="farmer">
                    <FarmerOrders />
                  </ProtectedRoute>
                }
              />

              {/* Protected routes for consumers */}
              <Route
                path="/cart"
                element={
                  <ProtectedRoute requiredRole="consumer">
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute requiredRole="consumer">
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/consumer/orders"
                element={
                  <ProtectedRoute requiredRole="consumer">
                    <ConsumerOrders />
                  </ProtectedRoute>
                }
              />

              {/* Fallback route */}
              <Route
                path="*"
                element={
                  <div className="text-center py-20">
                    <h1 className="text-4xl font-bold text-gray-800">
                      Page Not Found
                    </h1>
                    <p className="text-gray-600 mt-4">
                      The page you're looking for doesn't exist.
                    </p>
                  </div>
                }
              />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
