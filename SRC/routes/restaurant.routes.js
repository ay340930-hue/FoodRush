const express = require("express");

const router = express.Router();

const {
    createRestaurant,getAllRestaurants,getRestaurantById,updateRestaurant,deleteRestaurant
} = require("../Controllers/restaurant.controller");

const {
    checkForAuthentication,
    restrictTo,
} = require("../middleware/auth.middleware");

// Create Restaurant
router.post(
    "/create",
    checkForAuthentication,
    restrictTo(["restaurant"]),
    createRestaurant
);

router.get(
    "/login",
    checkForAuthentication,
    restrictTo(["restaurant"]),
    createRestaurant
);
router.get("/", getAllRestaurants);

router.put(
    "/:id",
    checkForAuthentication,
    restrictTo(["restaurant", "admin"]),
    updateRestaurant
);

router.delete(
    "/:id",
    checkForAuthentication,
    restrictTo(["restaurant", "admin"]),
   deleteRestaurant
);

module.exports = router;