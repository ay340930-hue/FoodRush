const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
    {
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food",
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        price: {
            type: Number,
            required: true,
        },
    },
    {
        _id: false,
    }
);

const orderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
        },

        items: [orderItemSchema],

        subtotal: {
            type: Number,
            required: true,
        },

        deliveryFee: {
            type: Number,
            default: 0,
        },

        tax: {
            type: Number,
            default: 0,
        },

        discount: {
            type: Number,
            default: 0,
        },

        totalAmount: {
            type: Number,
            required: true,
        },

        deliveryAddress: {
            type: String,
            required: true,
            trim: true,
        },

        paymentMethod: {
            type: String,
            enum: ["COD", "UPI", "Card"],
            required: true,
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed", "Refunded"],
            default: "Pending",
        },

        orderStatus: {
            type: String,
            enum: [
                "Pending",
                "Accepted",
                "Preparing",
                "Out for Delivery",
                "Delivered",
                "Cancelled",
            ],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);