const express = require ("express");
const router = express.Router();

const {createPayment,getPaymentById,updatePaymentStatus,refundPayment} = require("../Controllers/payment.controller");
const {checkForAuthentication,restrictTo}=require("../middleware/auth.middleware");

router.post("/",checkForAuthentication,restrictTo(["customer"]),createPayment);
router.get(
    "/order/:orderId",
    checkForAuthentication,
    restrictTo(["customer"]),
    getPaymentById
);
router.patch(
    "/:paymentId/status",
    checkForAuthentication,
    restrictTo(["admin"]),
    updatePaymentStatus
);
router.patch(
    "/:paymentId/refund",
    checkForAuthentication,
    restrictTo(["admin"]),
    refundPayment
);
module.exports= router;