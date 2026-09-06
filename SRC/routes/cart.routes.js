const express = require("express");
const router = express.Router();
const { addToCart,
    getCart,
    updateCart,
    removeCart,clearCart}= require ("../Controllers/cart.controller");
    const { checkForAuthentication, restrictTo } = require("../middleware/auth.middleware");


router.post(
    "/add",
    restrictTo(["customer"]),
    addToCart
);
router.get(
    "/",
    restrictTo(["customer"]),
    getCart
);

router.patch(
    "/update/:foodId",
    restrictTo(["customer"]),
    updateCart
);

router.delete(
    "/remove/:foodId",
    restrictTo(["customer"]),
    removeCart
);

router.delete(
    "/clear",
    restrictTo(["customer"]),
    clearCart
);

module.exports = router;