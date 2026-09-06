
const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile,
} = require("../Controllers/auth.controller");

const{ createRestaurant } = require("../Controllers/restaurant.controller");
const {
    checkForAuthentication,
    restrictTo,
} = require("../middleware/auth.middleware");

// Home Route
router.get("/", (req, res) => {
    res.json({
        message: "Welcome to FoodRush API ",
    });
});

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Profile (Logged-in users only)
router.get(
    "/profile",
    checkForAuthentication,
    restrictTo(["customer", "restaurant", "admin"]),
    getProfile
);
// Admin Test Route
router.get(
    "/admin",
    checkForAuthentication,
    restrictTo(["ADMIN"]),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Welcome Admin",
            user: req.user,
        });
    }
);



module.exports = router;