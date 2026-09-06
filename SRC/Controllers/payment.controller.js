const{createOrderNotification}= require("../Controllers/notification.controller");
const Payment = require("../models/payment.model");
const Order = require("../models/order.model");

const createPayment = async (req, res) => {
    try {
        console.log("Payment Body:", req.body);

        const { orderId, paymentMethod } = req.body;

        if (!orderId || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: "orderId and paymentMethod are required",
            });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (order.Customer.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not able to make payment for this order",
            });
        }

        const existingPayment = await Payment.findOne({
            order: orderId,
        });

        if (existingPayment) {
            return res.status(400).json({
                success: false,
                message: "Payment already exists for this order",
            });
        }

        const payment = await Payment.create({
            order: orderId,
            paymentMethod,
            amount: order.totalAmount,
            paymentStatus: "Pending",
        });

        return res.status(201).json({
            success: true,
            message: "Payment Created Successfully !!",
            payment,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the payment",
            error: err.message,
        });
    }
};

const getPaymentById = async (req,res)=>{

try{

    const {orderId} = req.params;

    if(!orderId){
        return res.status(404).json({

            success:false,
            message:"Oder does not found !!",

        });
    }

    const payment = await Payment.findById({order:orderId});
    if(!payment){
     return res.status(406).json({

        success:false,
        message:"Payment does not exist ",
     });
    }

    return res.status(201).json({
        success:true,
        message:"Payment successfully!!",
    });

}catch(error){

    return res.status(500).json({
        success:false,
        message:error.message,
    });

}

}





const updatePaymentStatus = async (req,res)=>{

    try{
        const {paymentId}=  req.params;
        const {paymentStatus,transactionId}=req.body;

        if(!paymentStatus){
            res.status(400).json({
                success:false,
                message:"Payment status is required !!",
            });
        
           
        }

        const allowedStatus=["Pending","Completed","Failed","Refunded"];

        if(!allowedStatus.includes(paymentStatus)){
            return res.status(400).json({
                success:false,
                message:"Invalid payment status !!",
            });
        }

        const payment = await Payment.findById(paymentId);

        if(!payment){

              return res.status(400).json({
                success:false,
                message:"Payment does not found  !!",
            });

        }

        payment.paymentStatus = paymentStatus;

        if(transactionId){
              payment.transactionId = transactionId;
        }
          await payment.save();


          const order = await Order.findById(payment.order);
        //   make payment automaticallly 

        if(paymentStatus === "Paid"){
            await createOrderNotification(
                order.customer,
                order._id,
                "Payment Successfully ",
                "Your payment has been completed successfully "
            );
        }

        if(paymentStatus === "Failed"){
            await createOrderNotification(
                order.customer,
                order._id,
                "Payment Failed",
                "Your Payment could not be completed"
            );
        }


        if(paymentStatus === "Refunded"){
            await createOrderNotification(
                order.customer,
                order._id,
                "Payment Refunded",
                "Your Payment has been refunded"
            );
        }


        return res.status(200).json({
            success: true,
            message: "Payment status updated successfully",
            payment,
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}


const refundPayment = async(req,res)=>{
    try{

    const 
    {paymentId} = req.params;
    const payment = await Payment.findById(paymentId);


    if(!paymentId){
        return res.status(404).json({
            success:false,
            message:"Payment does not found !!",
        });
    }

    if(payment.paymentStatus === "Refunded"){

        return res.status(400).json({


            success:false,
            message:"Payment already refunded !!",

        });
    }

     payment.paymentStatus = "Refunded";

        await payment.save();

        return res.status(200).json({
            success: true,
            message: "Payment refunded successfully",
            payment,
        });
    
    }catch(error){
        return res.status(500).json({
      success:false,
      message:error.message,
        });
    }
}

module.exports = {
    createPayment,getPaymentById,updatePaymentStatus,refundPayment,
};