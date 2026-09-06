const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
            unique: true,
        },

        deliveryPerson: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        status: {
            type: String,
            enum: [
                "Assigned",
                "Picked Up",
                "Out for Delivery",
                "Delivered",
            ],
            default: "Assigned",
        },

        pickupLocation: {
            type: String,
            required: true,
            trim: true,
        },

        deliveryLocation: {
            type: String,
            required: true,
            trim: true,
        },

        estimatedDeliveryTime: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Delivery", deliverySchema);