const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


// Authentication Middleware

async function checkForAuthentication(req, res, next) {
    console.log("Cookies:", req.cookies);
    try {

        const token = req.cookies?.token;
            console.log("Token:", token);

        if (!token) {
            req.user = null;
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
            console.log("User:", user);

        if (!user) {
            req.user = null;
            return next();
        }

        req.user = user;

        next();

    } catch (error) {
        req.user = null;
        next();
    }
}


// Authorization Middleware

function restrictTo(roles = []) {

    return function (req, res, next) {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Please login first",
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        next();
    };
}

module.exports = {
    checkForAuthentication,
    restrictTo,
};