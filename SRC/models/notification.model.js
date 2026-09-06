
const mongoose = require ("mongoose");

const notificationSchema = new mongoose.Schema({

user:{

type:mongoose.Schema.Types.ObjectId,

ref:"User",

required:true,

},

order:{

type:mongoose.Schema.Types.ObjectId,

ref:"Order",

default: null,

required:true,

},

title:{

type:String,

required:true,

trim:true,

},

message:{

    type:String,

    required:true,

    trim:true,

},

type:{

    type:String,

    enum:["order","Payment","Delivery","General"],

    default: "General",

    required:true,

},

isRead: {

    type: Boolean,

    default: false,

},

},

{

    timestamps: true,

});


module.exports={

    notificationSchema,

}

