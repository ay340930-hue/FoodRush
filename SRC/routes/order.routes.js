const express = require ("express");
const router = express.Router();
const {createOrder, getMyOrders,getOrderById,updateOrderStatus,cancelOrder,getRestaurantOrders,getRestaurantByStatus,updatePaymentStatus ,getOrderHistory, createOrderFromCart} = require("../Controllers/order.controller");
const {checkForAuthentication, restrictTo} = require("../middleware/auth.middleware");




// Create order
router.post(
    "/",
    checkForAuthentication,
    restrictTo(["customer"]),
    createOrder
);

// Customer order history
router.get(
    "/myOrder",
    checkForAuthentication,
    restrictTo(["customer"]),
    getMyOrders
);

// Restaurant orders
router.get(
    "/restaurant",
    checkForAuthentication,
    restrictTo(["restaurant", "admin"]),
    getRestaurantOrders
);

// Restaurant orders by status
router.get(
    "/restaurant/status",
    checkForAuthentication,
    restrictTo(["restaurant", "admin"]),
    getRestaurantByStatus
);

// Order history
router.get(
    "/history",
    checkForAuthentication,
    restrictTo(["customer", "admin"]),
    getOrderHistory
);

// Checkout from cart
router.post(
    "/checkout",
    checkForAuthentication,
    restrictTo(["customer"]),
    createOrderFromCart
);

// Update payment
router.patch(
    "/:id/payment",
    checkForAuthentication,
    restrictTo(["customer", "admin"]),
    updatePaymentStatus
);

// Cancel order
router.patch(
    "/:id/cancel",
    checkForAuthentication,
    restrictTo(["customer"]),
    cancelOrder
);

// Update order status
router.patch(
    "/:id/status",
    checkForAuthentication,
    restrictTo(["restaurant", "admin"]),
    updateOrderStatus
);

// Get ONE order
// Keep this LAST among GET routes
router.get(
    "/:id",
    checkForAuthentication,
    restrictTo(["customer"]),
    getOrderById
);

 module.exports = router;