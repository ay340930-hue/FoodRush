const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    // Restaurant Name
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    // Restaurant Email
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    // Restaurant Phone Number
    phone: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 15,
    },

    // Full Address
    address: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 200,
    },

    // City
    city: {
      type: String,
      required: true,
      trim: true,
    },

    // State
    state: {
      type: String,
      required: true,
      trim: true,
    },

    // Pincode
    pincode: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 6,
    },

    // Restaurant Image
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/demo/image/upload/default_restaurant.png",
    },

    // Multiple Cuisines
    cuisine: [
      {
        type: String,
        trim: true,
      },
    ],

    // Opening Time
    openingTime: {
      type: String,
      required: true,
      trim: true,
    },

    // Closing Time
    closingTime: {
      type: String,
      required: true,
      trim: true,
    },

    // Average Rating
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    // Number of Reviews
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Delivery Available
    deliveryAvailable: {
      type: Boolean,
      default: true,
    },

    // Restaurant Open or Closed
    isOpen: {
      type: Boolean,
      default: true,
    },

    // Restaurant Owner
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;