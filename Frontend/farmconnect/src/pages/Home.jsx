import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect logged-in users to products page
  useEffect(() => {
    if (user) {
      navigate("/products");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                🌱 Farm to Table Revolution
              </span>
            </div>
            <h1 className="text-hero mb-8">
              Welcome to <span className="text-gradient">FarmConnect</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              Connect directly with local farmers and enjoy fresh, organic
              produce delivered straight from farm to your table. Experience the
              future of sustainable agriculture and support your local
              community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/products"
                className="bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
              >
                <span className="flex items-center gap-2">
                  Shop Fresh Produce
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Link>
              {!user && (
                <Link
                  to="/register"
                  className="bg-white text-emerald-600 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
                >
                  Join Our Community
                </Link>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-emerald-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>100% Organic</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-emerald-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Local Farmers</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-emerald-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Same Day Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20 animate-bounce"></div>
        <div
          className="absolute bottom-20 right-10 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-teal-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-8 h-8 bg-emerald-300 rounded-full opacity-30 animate-ping"></div>
      </section>

      {/* New Product Categories Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fresh Categories Available
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover a wide variety of fresh, locally-sourced produce from our
              trusted farmer network
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              {
                name: "Vegetables",
                icon: "🥬",
                color: "bg-green-100",
                textColor: "text-green-800",
              },
              {
                name: "Fruits",
                icon: "🍎",
                color: "bg-red-100",
                textColor: "text-red-800",
              },
              {
                name: "Grains",
                icon: "🌾",
                color: "bg-yellow-100",
                textColor: "text-yellow-800",
              },
              {
                name: "Dairy",
                icon: "🥛",
                color: "bg-blue-100",
                textColor: "text-blue-800",
              },
              {
                name: "Herbs",
                icon: "🌿",
                color: "bg-emerald-100",
                textColor: "text-emerald-800",
              },
              {
                name: "Others",
                icon: "🥕",
                color: "bg-orange-100",
                textColor: "text-orange-800",
              },
            ].map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${category.name.toLowerCase()}`}
                className={`${category.color} ${category.textColor} p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group`}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <div className="font-semibold text-sm">{category.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-section-title mb-6">
              Why Choose <span className="text-gradient">FarmConnect</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference of fresh, locally-sourced produce while
              supporting your community farmers and the environment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                ),
                title: "Fresh & Organic",
                description:
                  "Get the freshest produce directly from local farms, harvested at peak ripeness for maximum nutrition and flavor.",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                title: "Support Local Community",
                description:
                  "Support your local farming community, create jobs, and reduce environmental impact through sustainable practices.",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                title: "Lightning Fast Delivery",
                description:
                  "Quick and reliable delivery service to ensure you get the freshest produce at your doorstep within hours.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 text-center group hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-emerald-600">{feature.icon}</div>
                </div>
                <h3 className="text-card-title mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-section-title mb-6">
              How <span className="text-gradient">FarmConnect</span> Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to get fresh produce from farm to your table
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Browse & Select",
                description:
                  "Explore fresh produce from verified local farmers. Filter by category, location, or organic certification.",
                icon: (
                  <svg
                    className="w-8 h-8"
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
                ),
              },
              {
                step: "02",
                title: "Place Order",
                description:
                  "Add items to your cart and checkout securely. Choose your preferred delivery time and payment method.",
                icon: (
                  <svg
                    className="w-8 h-8"
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
                ),
              },
              {
                step: "03",
                title: "Fresh Delivery",
                description:
                  "Receive your order fresh from the farm within hours. Track your delivery in real-time.",
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                ),
              },
            ].map((step, index) => (
              <div
                key={index}
                className="text-center group animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-emerald-600">{step.icon}</div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-section-title mb-6">What Our Community Says</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from farmers and customers who love FarmConnect
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Local Consumer",
                image: "👩‍💼",
                quote:
                  "FarmConnect has completely changed how I shop for produce. The quality is incredible, and I love supporting local farmers directly.",
                rating: 5,
              },
              {
                name: "Mike Chen",
                role: "Organic Farmer",
                image: "👨‍🌾",
                quote:
                  "This platform helped me reach customers I never could before. My income has increased by 40% since joining FarmConnect.",
                rating: 5,
              },
              {
                name: "Emily Davis",
                role: "Health Enthusiast",
                image: "👩‍⚕️",
                quote:
                  "The freshness and quality of produce here is unmatched. My family eats healthier knowing where our food comes from.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl mr-4">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Happy Farmers" },
              { number: "10K+", label: "Satisfied Customers" },
              { number: "50K+", label: "Products Delivered" },
              { number: "98%", label: "Customer Satisfaction" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-white animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-emerald-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-green-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-section-title text-white mb-6">
            Ready to Transform Your Kitchen?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join thousands of satisfied customers who choose FarmConnect for
            their fresh produce needs. Start your journey to healthier eating
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Browse Fresh Products
            </Link>
            <Link
              to="/register"
              className="bg-transparent text-white px-8 py-4 rounded-xl text-lg font-semibold border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Start Selling
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
