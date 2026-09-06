const express = require("express");
const router = express.Router();
const {createNotification,getNotifications,markNotificationAsRead,deleteNotification,unreadNotificationCount
    , createOrderNotification,
} = require("../Controllers/notification.controller");

const {
    checkForAuthentication,
    restrictTo,
} = require("../middleware/auth.middleware");


router.post(
    "/",
    checkForAuthentication,
    restrictTo(["admin"]),
    createNotification
);
 
router.get(
    "/my",
    checkForAuthentication,
    restrictTo(["admin","user"]),
    getNotifications
);

router.patch(
"/:notificationId/read",
checkForAuthentication,
restrictTo(["admin","user"]),
markNotificationAsRead
);

router.delete(
    "/:notificationId",
    checkForAuthentication,
    restrictTo(["customer"]),
    deleteNotification
);

router.get(
    "/unread/count",
    checkForAuthentication,
    restrictTo(["admin","user"]),
    unreadNotificationCount
);

router.post(
    "/order",
    checkForAuthentication,
    restrictTo(["admin"]),
    createOrderNotification
);


module.exports = router;