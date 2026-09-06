const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({

name:{
type:String,
required:true,
trim:true,
min:2,
max:100,
},

description:{
type:String,
required:true,
trim:true,
min:10,
max:1000,


},

price:{
type:Number,
required:true,
min:1,
max:10000000,

},

image:{

type:String,
required:true,
default:"https://res.cloudinary.com/dxj0d1v3g/image/upload/v1690911875/food-default-image_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1.png"

},
category:{
type:String,
required:true,
 enum: ["Pizza", "Burger", "Drinks", "Dessert", "Indian", "Chinese", "Italian"],

trim:true,

},

isVeg:{
type:Boolean,
required:true,
default:true,

},

preparationTime:{
type:Number,
required:true,
min:1,
max:1000,

},

restaurant:{
type:mongoose.Schema.Types.ObjectId,
ref:"Restaurant",
required:true,
},

});

module.exports = mongoose.model("Food",foodSchema);