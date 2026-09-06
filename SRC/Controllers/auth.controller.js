
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ==========================
// Register User
// ==========================
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Register Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

// ==========================
// Login User
// ==========================
const loginUser = async (req, res) => {
    try {

        console.log("Request Body:", req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            });
        }

        // Find user
        const user = await User.findOne({ email });

        console.log("User Found:", user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email",
            });
        }

        // Compare Password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        console.log("Password Match:", isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password",
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        console.log("JWT Token:", token);

        // Save Cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
        });

        console.log("Cookie Sent Successfully");

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {

        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

// ==========================
// Get Profile
// ==========================
const getProfile = (req, res) => {

    return res.status(200).json({
        success: true,
        message: "Profile fetched successfully",
        user: req.user,
    });

};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
};