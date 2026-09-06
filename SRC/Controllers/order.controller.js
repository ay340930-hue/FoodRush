const { Query } = require("mongoose");
const {createOrderNotification}= require("../Controllers/notification.controller");
const Food = require("../models/food.model");
const Order = require("../models/order.model");
const Restaurant = require("../models/restaurant.model");
const { findById } = require("../models/user.model");


const createOrder = async (req, res) => {
    try {

        const {
            restaurant,
            items,
            deliveryAddress,
            paymentMethod
        } = req.body;


        // Validate request
        if (
            !restaurant ||
            !items ||
            items.length === 0 ||
            !deliveryAddress ||
            !paymentMethod
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields !!"
            });
        }


        // Check restaurant
        const restaurantData = await Restaurant.findById(restaurant);

        if (!restaurantData) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }


        // Calculate subtotal
        let subTotal = 0;

        const orderItems = [];


        // Check every food item
        for (const item of items) {

            const food = await Food.findById(item.food);

            if (!food) {
                return res.status(404).json({
                    success: false,
                    message: "Food item not found"
                });
            }


            // Check food belongs to selected restaurant
            if (
                food.restaurant.toString() !== restaurant.toString()
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Food item does not belong to this restaurant"
                });
            }


            // Calculate subtotal
            subTotal += food.price * item.quantity;


            // Store food information in order
            orderItems.push({
                food: food._id,
                quantity: item.quantity,
                price: food.price
            });
        }


        // Charges
        const deliveryFee = 40;
        const tax = subTotal * 0.05;
        const discount = 0;

        const total = subTotal + deliveryFee + tax - discount;


        // Create order
        const newOrder = await Order.create({

           Customer: req.user._id,
Restaurant: restaurant,
            items: orderItems,
subtotal: subTotal,
totalAmount: total,
            tax: tax,
            discount: discount,
          

            deliveryAddress: deliveryAddress,
            paymentMethod: paymentMethod,

            paymentStatus: "Pending",
            orderStatus: "Pending"
        });


        // Send response
        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order: newOrder
        });


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getMyOrders = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const orders = await Order.find({
            Customer: req.user._id
        })
        .populate("Restaurant")
        .populate("items.food")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        const totalOrders = await Order.countDocuments({
            Customer: req.user._id
        });

        return res.status(200).json({
            success: true,
            page: page,
            limit: limit,
            totalOrders: totalOrders,
            totalPages: Math.ceil(totalOrders / limit),
            orders: orders
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}
 const getOrderById = async (req,res) => {

try{

const{id} = req.params;
const orderData = await Order.findById(id)
    .populate("Restaurant")
    .populate("items.food");

if(!orderData){
     return res.status(404).json({
                success: false,
                message: "Order not found"
            });
}
if(orderData.Customer.toString()!== req.user._id.toString() && req.user!=="admin"){
     return res.status(403).json({
                success: false,
                message: "You are not authorized to view this order"
            });
}

        return res.status(200).json({
            success: true,
            order: orderData
        });


}catch(error){
 return res.status(500).json({
            success: false,
            message: error.message
        });
}


 }

const updateOrderStatus = async (req,res ) => {
try{
    const {id} = req.params;
    const {orderStatus} = req.body;

    const allowedStatuses =[
        "Pending",
            "Accepted",
            "Preparing",
            "Out for Delivery",
            "Delivered",
            "Cancelled"
    ];
     
    if(!allowedStatuses.includes(orderStatus)){
        return res.status(401).json({
            success:false,
            message:"The status does not matches with your order "
        });
    }
    const orderData = await Order.findById(id)
    .populate("Restaurant");
   if(!orderData){
    return res.status(403).json({
        success:false,
        message:" Order does not exist !! "
    });
   }
   if( orderData.Restaurant.owner.toString()!== req.user._id.toString()&& req.user.role !=="admin"){
    return res.status(403).json({
        success:false,
        message: "You are not authorize , you cant update the order"
    });
   }
    orderData.orderStatus = orderStatus;

        await orderData.save();

        /// connecting thee createOrdernOTIFIVATION WTH ORDER

        let title="";
        let message="";
        if(status ==="Accepted"){
            title="Order Accepted";
            message="Your order has been accepted by the restaurant";
        }

        if(status ==="Preparing"){
            title="Order Preparing";
            message="Your order is being prepared by the restaurant";
        }

        if(status ==="Out for Delivery"){
            title="Order Out for Delivery";
            message="Your order is out for delivery";

        }

        if(status ==="Delivered"){
            title="Order Delivered";
            message="Your order has been delivered";
        }
        if(title && message){
            await createOrderNotification(
                order.customer,
                order._id,
                title,
                message,
            );
        }

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order: orderData
        });

}catch(error){
    return res.status(500).json({success:false , message:error.message});
}
}

const cancelOrder = async (req,res) => {

try{
const {id} = req.params;
const orderData = await Order.findById(id);

if(!orderData){
    return res.status(401).json({
   success:false,
   mesage:"Order not found"

    });
}

if(orderData.Customer.toString()!==req.user._id.toString()){
    return res.status(403).json({
        success:false,
        message:"user not authorize so you can not cancel the order"
    });
}
  // Don't allow cancellation after delivery
        if (
            orderData.orderStatus === "Delivered" ||
            orderData.orderStatus === "Cancelled"
        ) {
            return res.status(400).json({
                success: false,
                message: "This order cannot be cancelled"
            });
        }
         orderData.orderStatus = "Cancelled";

        await orderData.save();

        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            order: orderData
        });
}catch(error){

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

const getRestaurantOrders = async (req,res) =>{

try{

    const restaurantData = await Order.findById({  owner: req.user._id});
     if (!restaurantData) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }
         // Find orders of this restaurant
        const orders = await Order.find({
            Restaurant: restaurantData._id
        })
        .populate("Customer")
        .populate("items.food")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: orders.length,
            orders: orders
        });

}catch(error){
return res.status(500).json({
            success: false,
            message: error.message
        });


}


}

const getRestaurantByStatus = async (req,res) => {

    try{

         const { status } = req.query;

 const allowedStatuses = [
            "Pending",
            "Accepted",
            "Preparing",
            "Out for Delivery",
            "Delivered",
            "Cancelled"
        ];

        if(!allowedStatuses.includes(status)){
            return res.status(402).json({
                success:false,
                message:"Invalid order status"
            });
        }
 const restaurantData = await Restaurant.findOne({
            owner: req.user._id
        });

        if (!restaurantData) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }

              const orders = await Order.find({
            Restaurant: restaurantData._id,
            orderStatus: status
        })
        .populate("Customer")
        .populate("items.food")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: orders.length,
            orders: orders
        });


    }catch(error){
return res.status(500).json({
            success: false,
            message: error.message
        });


    }
}

const updatePaymentStatus = async (req,res) =>{
    try{
const {id} = req.params;

const {paymentStatus} = req.body;

 const allowedStatuses = [
            "Pending",
            "Paid",
            "Failed",
            "Refunded"
        ];

        if (!allowedStatuses.includes(paymentStatus)) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment status"
            });
        }
const orderData = await Order.findById(id);
if(!orderData){
    return res.status(400).json({success:false,
        message:"Payment satatus not found "
    });
}
if(orderData.Customer.toString() !== req.user._id.toString() && req.user.role!=="admin"){
     return res.status(400).json({success:false,
        message:"You are not authorized to update payment status "
    });
}
orderData.paymentStatus = paymentStatus;
await orderData.save();

 return res.status(201).json({success:true,
        message:"Payment Updated successfully "
    });
    }catch(error){
 return res.status(500).json({success:false,
        message:error.message
    });
    }
}

const getOrderHistory = async (req,res) =>{
    try{

        const order = await Order.findById({
              Customer: req.user._id,
            orderStatus: {
                $in: ["Delivered", "Cancelled"]
            }
        })
          .populate("Restaurant")
        .populate("items.food")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: orders.length,
            orders: orders
        });

    }catch(error){
 return res.status(500).json({success:false,
        message:error.message
    });
    }
}

// important we connected our cart and order together
const createOrderFromCart = async (req,res)=>{
try{
    const {daliveryAddress,paymentMethod } = req.body;
    if(!deliveryAddress||!paymentMethod){
        return res.status(402).json({
            success:fals,
            message:"All fields are required"});
    }

    const customerId = req.user._id;
  
    const cart = await Cart.findOne({
        customer:customerId,
    });
    if(!cart){
        return res.status (404).json({
            success:false ,
            message :"Cart is empty!!!"
        });
    }  
     if (!cart.items || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }
        const orderItems = [];
 let subtotal = 0;
 const food = await Food.findById(items.food);
 if(!food){
    return res.status(403).json({
        success:false,
        message:"Food is not exists!!"
    });
 }
 const totalItems = food.price * item.quantity;

subtotal += itemTotal;
 orderItems.push({
                food: food._id,
                quantity: item.quantity,
                price: food.price
            });
 const deliveryFee = subtotal >= 500 ? 0 : 40;
  const tax = subtotal * 0.05;
   const discount = 0;
       const totalAmount =
            subtotal +
            deliveryFee +
            tax -
            discount;
  const order = await Order.create({
            customer: customerId,
            restaurant: cart.restaurant,
            items: orderItems,
            subtotal,
            deliveryFee,
            tax,
            discount,
            totalAmount,
            deliveryAddress,
            paymentMethod
        });

        // 11. Clear cart after successful order
        cart.items = [];
        await cart.save();

        // 12. Response
        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        console.error("Create order error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}



// Order History






module.exports = {
    createOrder  ,  getMyOrders  , getOrderById, updateOrderStatus, cancelOrder , getRestaurantOrders , getRestaurantByStatus,updatePaymentStatus , getOrderHistory , createOrderFromCart
};