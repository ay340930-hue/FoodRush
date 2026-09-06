const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

const connectDB = require("./Config/db");
const authRoutes = require("./routes/auth.routes");
const restaurantRoutes = require("./routes/restaurant.routes");
const foodRoutes = require("./routes/food.routes");
const cartRoutes = require("./routes/cart.routes");
const deliveryRoutes = require("./routes/delivery.routes");
const paymentRoutes = require("./routes/payment.routes");
const notificationRoutes = require("./routes/notification.routes");
const {
    checkForAuthentication,
    restrictTo
} = require("./middleware/auth.middleware");
const errorHandler = require("./middleware/error.middleware");


const orderRoutes = require("./routes/order.routes");
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication);

app.use(errorHandler);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notification",notificationRoutes);
// Database
connectDB();

// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "FoodRush is running now!!"
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server connected on port ${PORT}`);
});