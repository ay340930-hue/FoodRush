const express = require("express");
const router = express.Router();
const { createFood,getAllFoods,getFoodById,updateFood,deleteFood} = require("../Controllers/food.controller");
const { checkForAuthentication, restrictTo } = require("../middleware/auth.middleware");




router.post("/create",checkForAuthentication,
    restrictTo(["restaurant", "admin"]),createFood);


router.get("/",getAllFoods);
router.get("/:id",getFoodById);
router.put("/:id",checkForAuthentication,
    restrictTo(["restaurant","admin"]),updateFood);

    router.delete("/:id",checkForAuthentication,
    restrictTo(["restaurant","admin"]),deleteFood);

    module.exports = router;