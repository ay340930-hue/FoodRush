const express = require("express");

const router = express.Router();

const {
    createDelivery,
    assignDeliveryPerson,
    updateDeliveryStatus,
    getDeliveryById,getMyDeliveries,getMyOrderDelivery,getDeliveryHistory,getAllDeliveries
} = require("../Controllers/delivery.controller");

const {
    checkForAuthentication,
    restrictTo
} = require("../middleware/auth.middleware");


router.post("/", createDelivery);

router.patch("/:deliveryId/assign", assignDeliveryPerson);

router.patch("/:deliveryId/status", updateDeliveryStatus);

router.get("/:deliveryId", getDeliveryById);
router.get(
    "/my-deliveries",
    checkForAuthentication,
    restrictTo(["delivery"]),
    getMyDeliveries
);
router.patch(
    "/:deliveryId/status",
    checkForAuthentication,
    restrictTo(["delivery"]),
    updateDeliveryStatus
);
router.get(
    "/history",
    checkForAuthentication,
    restrictTo(["delivery"]),
    getDeliveryHistory
);
router.get(
    "/order/:orderId",
    checkForAuthentication,
    restrictTo(["customer"]),
    getMyOrderDelivery
);
router.get(
    "/",
    checkForAuthentication,
    restrictTo(["admin"]),
    getAllDeliveries
);


module.exports = router;