import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                <span className="text-white text-xl font-bold">🌱</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                FarmConnect
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {user && (
              <Link
                to="/products"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 relative group"
              >
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
            )}

            {user ? (
              <>
                <div className="flex items-center space-x-6">
                  {user.role === "farmer" && (
                    <>
                      <Link
                        to="/farmer/dashboard"
                        className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/farmer/orders"
                        className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200"
                      >
                        Orders
                      </Link>
                    </>
                  )}

                  {user.role === "consumer" && (
                    <>
                      <Link
                        to="/cart"
                        className="relative text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 group"
                      >
                        <div className="flex items-center space-x-1">
                          <svg
                            className="w-6 h-6"
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
                          <span>Cart</span>
                        </div>
                        {getCartCount() > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                            {getCartCount()}
                          </span>
                        )}
                      </Link>
                      <Link
                        to="/consumer/orders"
                        className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200"
                      >
                        My Orders
                      </Link>
                    </>
                  )}

                  {/* Profile section moved to the right end */}
                  <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-xl">
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        {user.name}
                      </span>
                      <div className="text-xs text-emerald-600 font-medium capitalize">
                        {user.role}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 px-4 py-2 rounded-xl font-medium transition-all duration-200 border border-gray-200 hover:border-red-200"
                  >
                    <div className="flex items-center space-x-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-emerald-600 focus:outline-none focus:text-emerald-600 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user && (
                <Link
                  to="/products"
                  className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
              )}

              {user ? (
                <>
                  {user.role === "farmer" && (
                    <>
                      <Link
                        to="/farmer/dashboard"
                        className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/farmer/orders"
                        className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Orders
                      </Link>
                    </>
                  )}

                  {user.role === "consumer" && (
                    <>
                      <Link
                        to="/cart"
                        className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="flex items-center justify-between">
                          <span>Cart</span>
                          {getCartCount() > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {getCartCount()}
                            </span>
                          )}
                        </div>
                      </Link>
                      <Link
                        to="/consumer/orders"
                        className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                    </>
                  )}

                  {/* Profile section moved to bottom, near logout */}
                  <div className="px-3 py-2 bg-emerald-50 rounded-lg mb-2 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">
                          {user.name}
                        </div>
                        <div className="text-xs text-emerald-600 capitalize">
                          {user.role}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-all duration-200 text-center font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
