# 🌱 FarmConnect

A simple MERN-based digital marketplace connecting farmers directly with consumers for fresh, local produce.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [User Roles](#user-roles)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control (Farmer/Consumer)
- Protected routes on frontend and backend
- Secure password hashing with bcrypt

### 👨‍🌾 Farmer Features

- **Product Management**
  - Add new products with details (name, price, quantity, category, image, description)
  - Edit existing products
  - Delete products
  - View all own products in a dashboard
- **Order Management**
  - View orders received from customers
  - Update order status (Pending → Confirmed → Shipped → Delivered)
  - Cancel orders if needed

### 🛒 Consumer Features

- **Product Browsing**
  - Browse all available products
  - Search products by name
  - Filter by category (vegetables, fruits, grains, dairy, herbs, other)
  - View product details
- **Shopping Cart**
  - Add products to cart
  - Update quantities
  - Remove items
  - Local state management
- **Order Placement**
  - Place orders with delivery details
  - Track order status
  - View order history

### 🎨 UI/UX Features

- Clean, responsive design using Tailwind CSS
- Mobile-friendly interface
- Loading states and error handling
- Intuitive navigation with role-based menus

## 🛠 Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend

- **React.js** - UI library
- **React Router** - Navigation
- **Context API** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## 📁 Project Structure

```
wt_project1/
├── Backend/
│   ├── config/
│   │   └── mongoose-connection.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── user-model.js
│   │   ├── product-model.js
│   │   └── order-model.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── orders.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── index.js
│   └── package.json
└── Frontend/
    └── farmconnect/
        ├── src/
        │   ├── components/
        │   │   ├── Navbar.jsx
        │   │   ├── ProtectedRoute.jsx
        │   │   └── Loading.jsx
        │   ├── context/
        │   │   ├── AuthContext.jsx
        │   │   └── CartContext.jsx
        │   ├── pages/
        │   │   ├── Home.jsx
        │   │   ├── Login.jsx
        │   │   ├── Register.jsx
        │   │   ├── Products.jsx
        │   │   ├── FarmerDashboard.jsx
        │   │   ├── FarmerOrders.jsx
        │   │   ├── Cart.jsx
        │   │   ├── Checkout.jsx
        │   │   └── ConsumerOrders.jsx
        │   ├── App.jsx
        │   ├── main.jsx
        │   └── index.css
        ├── package.json
        └── vite.config.js
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd wt_project1
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:

```env
FRONTEND_URL=http://localhost:5174
MONGODB_URI=mongodb://localhost:27017/farmconnect
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
PORT=3000
```

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../Frontend/farmconnect
npm install
```

Start the frontend development server:

```bash
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5174
- Backend API: http://localhost:3000

## 📚 API Documentation

### Authentication Routes (`/api/auth`)

- `POST /register` - Register a new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /profile` - Get current user profile (protected)

### Product Routes (`/api/products`)

- `GET /` - Get all products (with search/filter)
- `GET /:id` - Get single product
- `GET /farmer/my-products` - Get farmer's products (farmer only)
- `POST /` - Create new product (farmer only)
- `PUT /:id` - Update product (farmer only)
- `DELETE /:id` - Delete product (farmer only)

### Order Routes (`/api/orders`)

- `POST /` - Create new order (consumer only)
- `GET /consumer/my-orders` - Get consumer's orders (consumer only)
- `GET /farmer/received-orders` - Get farmer's orders (farmer only)
- `PUT /:id/status` - Update order status (farmer only)
- `GET /:id` - Get single order (buyer/seller only)

## 👥 User Roles

### 🌾 Farmer Role

- Can add, edit, and delete their own products
- Can view and manage orders received from consumers
- Can update order status through the fulfillment process
- Access to farmer dashboard and order management

### 🛍️ Consumer Role

- Can browse and search all products
- Can add products to cart and place orders
- Can track their order status
- Can view order history

## 🖼️ Screenshots

_Note: Add screenshots of your application here_

### Home Page

- Landing page with role-based navigation
- Features overview for farmers and consumers

### Product Browsing

- Grid layout of products with search and filter
- Product cards with images, prices, and farmer details

### Farmer Dashboard

- Product management interface
- Add/edit product forms
- Order management system

### Shopping Cart & Checkout

- Cart with quantity management
- Checkout form with delivery details
- Order confirmation

## 🔮 Future Enhancements

### Immediate Improvements

- Image upload functionality (currently uses URLs)
- Payment gateway integration
- Email notifications for orders
- Advanced search with price range filters
- Product ratings and reviews

### Advanced Features

- Real-time chat between farmers and consumers
- Inventory management with low-stock alerts
- Delivery tracking integration
- Mobile app development
- Multi-language support
- Analytics dashboard for farmers

### Technical Improvements

- Unit and integration tests
- API rate limiting
- Database indexing for better performance
- CDN integration for images
- PWA capabilities

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

**Made with ❤️ for connecting farmers and consumers through technology**
