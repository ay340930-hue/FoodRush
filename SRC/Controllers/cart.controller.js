const Cart = require("../models/cart.model");
const Food = require("../models/food.model");



// ADD TO CART


const addToCart = async (req, res) => {
    try {
        const { foodId, quantity } = req.body;

        // 1. Check foodId
        if (!foodId) {
            return res.status(400).json({
                success: false,
                message: "Food ID is required"
            });
        }

        // 2. Find the food
        const food = await Food.findById(foodId);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found"
            });
        }

        // 3. Get logged-in customer
        const customerId = req.user._id;

        // 4. Find customer's cart
        let cart = await Cart.findOne({
            customer: customerId
        });

        // 5. If cart doesn't exist, create it
        if (!cart) {
            cart = await Cart.create({
                customer: customerId,
                restaurant: food.restaurant,
                items: [
                    {
                        food: foodId,
                        quantity: quantity || 1
                    }
                ]
            });

            return res.status(201).json({
                success: true,
                message: "Food added to cart",
                cart
            });
        }

        // 6. Check if food already exists in cart
        const existingItem = cart.items.find(
            item => item.food.toString() === foodId
        );

        // 7. If already exists, increase quantity
        if (existingItem) {
            existingItem.quantity += quantity || 1;
        }

        // 8. Otherwise add new item
        else {
            cart.items.push({
                food: foodId,
                quantity: quantity || 1
            });
        }

        // 9. Save cart
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Food added to cart",
            cart
        });

    } catch (error) {
        console.error("Add to cart error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// GET CART


const getCart = async (req, res) => {
    try {
        const customerId = req.user._id;

        const cart = await Cart.findOne({
            customer: customerId
        })
            .populate("items.food")
            .populate("restaurant");

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart is empty"
            });
        }

        return res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        console.error("Get cart error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// UPDATE CART


const updateCart = async (req, res) => {
    try {
        const { foodId } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1"
            });
        }

        const customerId = req.user._id;

        const cart = await Cart.findOne({
            customer: customerId
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            item => item.food.toString() === foodId
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Food not found in cart"
            });
        }

        item.quantity = quantity;

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart
        });

    } catch (error) {
        console.error("Update cart error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// REMOVE FROM CART


const removeCart = async (req, res) => {
    try {
        const customerId = req.user._id;
        const { foodId } = req.params;

        const cart = await Cart.findOne({
            customer: customerId
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const itemExists = cart.items.some(
            item => item.food.toString() === foodId
        );

        if (!itemExists) {
            return res.status(404).json({
                success: false,
                message: "Food not found in cart"
            });
        }

        cart.items = cart.items.filter(
            item => item.food.toString() !== foodId
        );

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Food removed from cart",
            cart
        });

    } catch (error) {
        console.error("Remove from cart error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const clearCart = async (req, res) => {
    try {
        const customerId = req.user._id;

        const cart = await Cart.findOne({
            customer: customerId
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = [];

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            cart
        });

    } catch (error) {
        console.error("Clear cart error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeCart,
    clearCart
};