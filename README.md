🍔 FoodRush — Full-Stack Food Delivery Platform

FoodRush is a full-stack food delivery web application that allows users to explore restaurants, discover food items, manage their cart, place orders, and track their orders.

The project is built using modern web technologies with a React frontend and Node.js/Express.js backend connected to MongoDB.

---

 🚀 Features

 👤 User Authentication
- User registration and login
- JWT-based authentication
- Role-based authorization
- Customer, Restaurant, Admin and Delivery roles
- Secure password handling

 🍽️ Restaurant Management
- View available restaurants
- Restaurant details
- Cuisine information
- Restaurant ratings
- Restaurant management for authorized users

 🍕 Food Management
- Browse food items
- Food categories
- Veg/Non-Veg classification
- Food price and description
- Preparation time
- Restaurant-wise food management

 🛒 Cart
- Add food items to cart
- Update food quantity
- Remove items
- View cart
- Restaurant-based cart handling

📦 Orders
- Place orders
- View order history
- Track order status
- Cancel orders
- Restaurant order management

🚴 Delivery
- Delivery assignment
- Pickup status
- Out-for-delivery status
- Delivery completion
- Estimated delivery time

 💳 Payments
- Cash on Delivery
- Online payment support structure
- Payment status tracking
- Transaction ID support
- Refund status

🔔 Notifications
- Order notifications
- Payment notifications
- Delivery notifications
- Read/unread notification status

---

🛠️ Tech Stack

Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Vite
- React Router DOM

 Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

 Development Tools

- Git
- GitHub
- VS Code
- Postman
- MongoDB Atlas

---

📁 Project Structure

```text
FoodRush/
│
├── SRC/
│   ├── Config/
│   │   └── db.js
│   │
│   ├── Controllers/
│   │   ├── auth.controller.js
│   │   ├── cart.controller.js
│   │   ├── delivery.controller.js
│   │   ├── food.controller.js
│   │   ├── notification.controller.js
│   │   ├── order.controller.js
│   │   ├── payment.controller.js
│   │   └── restaurant.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── models/
│   │   ├── cart.model.js
│   │   ├── delivery.model.js
│   │   ├── food.model.js
│   │   ├── notification.model.js
│   │   ├── order.model.js
│   │   ├── payment.model.js
│   │   ├── restaurant.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── cart.routes.js
│   │   ├── delivery.routes.js
│   │   ├── food.routes.js
│   │   ├── notification.routes.js
│   │   ├── order.routes.js
│   │   ├── payment.routes.js
│   │   └── restaurant.routes.js
│   │
│   └── server.js
│
├── foodrush-frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── FoodCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── RestaurantCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Foods.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Restaurants.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── package.json
└── package-lock.json
