const {createOrderNotifiacation}=require("../Controllers/notification.controller");
const delivery = require ("../models/delivery.model");
const order = require ("../models/order.model");

const createDelivery = async (req,res)=>{
    try{
const {orderId,pickupLocation,deliveryLocation}= req.body;

if(!orderId||!pickupLocation||!deliveryLocation){
    return res.status (400).json({
        success:false,
message : "all filed are required to be filled!!"
    });
}

const order = await Order.findOne({
    order:oredrId,
});

if(!oredr){
     return res.status (400).json({
        success:false,
message : "Order Does not found !!"
    });
}

const existingDelivery = await Order.findById(orderId);

if(existingOrder){
     return res.status (400).json({
        success:true,
message : "We must have to add atleast one order to be delivered !!"
    });
}

const delivery = await Delivery.create({
    orderId:order,
    pickupLocation,
    deliveryLocation
});



 return res.status (201).json({
        success:true,
message : "Your Oreder is successfully delivered !!",delivery
    });


}catch(error){
 return res.status (500).json({
        success:false,
message : error.message,
    });
}
}



// assigning Delivery Person
const assignDeliveryPerson=async(req,res)=>{
try{

const {deliveryPersonId}=req.body;
const{deliveryPerson}=req.params;

if(!deliveryPersonId){
    return res.status(404).json({
        success:false,
        message:"The delivery person was not assigned!!"
    });
}

deliveryPerson = await Delivery.findOne(deliveryPersonId);

if(!deliveryPerson){
    return res.status(404).json({
        success:false,
        message:"The delivery person was not found!!"
    });
}

if(deliveryPerson.role != "delivery"){
    return res.status(404).json({
        success:false,
        message:"The delivery person was not assigned!!"
    });
}
  const delivery = await Delivery.findById(deliveryId);
if(!delivery){
    return res.status(404).json({
        success:false,
        message:"delivery not found!!"
    });
}
delivery.deliveryPerson=deliveryPersonId;

  delivery.status = "Assigned";

        await delivery.save();



 return res.status(201).json({
        success:true,
        message:"Delivered!!"
    });


}catch(error){
 return res.status(500).json({
        success:false,
        message:error.message,
    });
}


}


// Delivery Status Updated


const updateDeliveryStatus = async (req,res)=>{
try{
const {deliveryId}= req.params;
const {status}=req.body;
if(!status){
    return res.status(404).json({
        success:false,
        message:"the status does not found !!"
    });
}

const allowedStatus = [
     "Assigned",
            "Picked Up",
            "Out for Delivery",
            "Delivered",
];

if(!allowedStatus.includes(status)){
    return res.status(404).json({
        success:false,
        message:"the status does not found inside the allowed satatus !!"
    }); 
}

const delivery=await Delivery.findOne(deliveryId);

// it will validated that the assigned delivery person will deliverd the order
const currentStatus = delivery.status;

const validNextStatus = {
    "Assigned": "Picked Up",
    "Picked Up": "Out for Delivery",
    "Out for Delivery": "Delivered",
};

if (validNextStatus[currentStatus] !== status) {
    return res.status(400).json({
        message: `You cannot change status from ${currentStatus} to ${status}`,
    });
}

delivery.status = status;

if(!delivery){
     return res.status(404).json({
        success:false,
        message:"delivery not found !!"
    });
}
if(!delivery.deliveryPerson||delivery.deliveryPerson.Tostring()!==req.user._id.Tostring()){
    return res.status(400).json({
        success:false,
        message:" You are not assigned to delivered!!",
    });
}
 
delivery.status = status;

await delivery.save();


// make automatic delivery 
const order = await Order.findById(delivery.order);



if (order) {

if(status === "Picked Up"){
    await createOrderNotification(
        order.customer,
        order._id,
        "Order Picked Up",
        "Your order has been picked up by the delivery person"
    );
}

    if (status === "Out for Delivery") {
       // order.orderStatus = "Out for Delivery";
        await createOrderNotification(
            order.customer,
            order._id,
            "Order Out for Delivery",
            "Your order is out for delivery"
        );
    }

    if (status === "Delivered") {
        // order.orderStatus = "Delivered";

        await createOrderNotification(
            order.customer,
            order._id,
            "Order Delivered",
            "Your order has been delivered"
        );
    }

    await order.save();
}

return res.status(200).json({
            message: "Delivery status updated successfully",
            delivery,
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message: error.message,
        
        });
    }

}





// to get all delivery that will see by the customer to enter the id of order 
const getDeliveryById = async (req,res)=>{
try{

    const {deliveryId} = req.params;

    const delivery = await Delivery.findById(deliveryId)
        .populate ("order")
        .populate("deliveryPerson","name email role");
    

    if(!delivery){
        return res.status(404).json({
            success:false,
            message:"delivery not found !!"
        });
    }
 return res.status(200).json({
            message: "Delivery fetched successfully",
            delivery,
        });


}catch(error){

 return res.status(500).json({
            message: error.message,
           
        });
}


}



// fetching the order that only customer can view the order 
const getMyDeliveries = async (req,res)=>{
    try{

        const deliveries = await Delivery.findOne({
            deliveries:req.user._id,
        })
        .poppulate("order")
        .populate("deliveries"," email name role ")
          .sort({ createdAt: -1 });


return res.status(200).json({
    success:true,
    message : "Deliveries fetched successfully",
    count:deliveries.length,
    deliveries,
});


    }catch(error){
return res.status(500).json({
    success:false,
    message :error.message,
});
    }
}


// order view only by the customer
const getMyOrderDelivery = async(req,res)=>{
    try{
const {orderId} = req.params;

const order = await Order.findOne(orderId);

if(!order){
    return res.status(400).json({
        success:false,
        message:"order cant be found ",
    });

}

if(!order.Customer.Tostring()!==req.user._id.Tostring()){
    return res.status(400).json({
        success:false,
        message :"You cant viewed due to you not authenticated!!"
    });
        }

        const delivery = await Delivery.findOne({
            order:orderId,
        })
        .populate("order")
        .populate("delivery","name email role");
    

        if(!delivery){
            return res.status(400).json({
                success:false,
                message : " Delivery can not be fetched !! "
            });

        }

        return res.status(200).json(
            {
                success:true,
                message:"delivery will be fetched successfully!!!"
            }
        );

}catch(error){
    res.status(500).json({
        success:false,
        message:error.message
    });
}
}

const getDeliveryHistory=async (req,res)=>{
try{
const delivery = await Delivery.find({
    deliveryPerson:req.user._id,
    status:"Delivered",
})
.populate("order")
.poppulate("deliveries","name email role")
.sort({updatedAt:-1});


return res.status(201).json({
    success:false,
    message:"delivery history is upated successfully!!",
     count: deliveries.length,
            deliveries,
});

}catch(error){
res.status(500).json({
        success:false,
        message:error.message
    });
}
}

const getAllDeliveries = async (req,res)=>{
    try{
        const deliveries = await Delivery.find()
        .populate("order")
        .populate("deliveryPerson","name email role")
        .sort({crratedAt:-1});

        return res.status(201).json({
            success:true,
            message :" All Deliveries Fetched Successfully !!",
            count:deliveries.length,
            deliveries
        });


    }catch(error){
        return res.status(500).json({
            success:false,
            message:message.error
        });

    }
}

module.exports = {createDelivery,assignDeliveryPerson,updateDeliveryStatus,getDeliveryById,
    getMyDeliveries,getMyOrderDelivery,getDeliveryHistory,getAllDeliveries};