const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const paymentSchema = new Schema({

    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"order",
        required:true,
        unique:true,

    },

    amount:{

        type:Number,
        required:true,
        min:0

    },

    paymentMethod:{

        type:String,
        enum:["COD","ONLINE","CARD"],
        required:true,
        min:1,

    },

    paymentStatus:{

        type:String,
        enum:["PENDING","COMPLETED","FAILED"],
          default: "Pending",
  
       

    },
    transactionId:{
     type:String,
     default:null,
     trim:true,

    },
},
{
    timestamps:true,
}

);
module.exports = {
    paymentSchema,
}