const express = require("express");
const notification = require("../models/notification.model");

const createNotification = async(req,res)=>{
    try{

        const { userId,
            orderId,
            title,
            message,
            type,}=req.body;


      if(!userId || !title || !message){
        return res.status(404).json({
            success:false,
            message:"all feilds are required!!",
        });
      }

      const notificationData = await notification.create({
        user:userId,
        order:orderId||null,
        title,
        message,
        type:type||"General",

      });
      return res.status(201).json({
            success: true,
            message: "Notification created successfully",
            notification,
        });

    }catch(error){
        return res.status(404).json({
            success:false,
            message:error.message,
        });
    }

}

const getNotifications = async (req,res)=>{

    try{

        const notification = await Notification.findOne({
            user:req.user._id,
        }).populate("order")
        .sort({createdAt:-1});
        ;

        return res.status(200).json({
            success:true,
            count : notification.length,
            message:"Notification fetched successfully",
            notification,
        });

    }catch(error){
        return res.status(404).json({
            success:false,
            message:error.message,
        });
    }

}

const markNotificationAsRead = async (req,res)=>{

try{
    const{ notificationId} = req.params;

    const notification = await Notification.findOne({
       _id: notificationId,
       user:req.user._id,
    });

    if(!notification){
        return res.status(404).json({
            success:false,
            message:"Notification not found",
        });
    }

    notification.isRead = true;
    await notification.save();

    return res.status(200).json({
        success:true,
        message:"Notification marked as read",
    });

}catch(error){
    return res.status(500).json({

        success:false,
        message:error.message,
    });
}

}

const deleteNotification = async(req,res)=>{

try{

    const {notificationId }= req.params;
    const notification = await Notification.findOneAndDelete({
        _id:notificationId,
        user:req.user._id,
    });

    if(!notification){
        return res.status(404).json({
            success:false,
            message:"Notification can not found !!"

        });
    }

     return res.status(200).json({
            success:true,
            message:"Notification deleted Successfully  !!"

        });

}catch(error){
    return res.status(500).json({
success:false ,
message : error .message 
    });
}


}


const unreadNotificationCount= async(req,res)=>{

    try{


        const unreadCount = await Notification.countDocuments({

            _id:notificationId,
            user:req.user._id,
            isRead:false,


        });
        return res.status(200).json({

            success:true,
            message:"Unread notification count fetched successfully",
            count:unreadCount,
        });


    }catch(error){
       return res.status(500).json({
success:false ,
message : error .message 
    }); 
    }

}


const createOrderNotification = async (userId,orderId,title,message)=>{
try{

    const notification= await Notification.create({


        user:userId,
        order:orderId,
        title,
        message,
        type:"Order",

    });
    return notification;

}catch(error){
         return res.status(500).json({
success:false ,
message : error .message ,


    }); 
}




}

module.exports={
    createNotification,getNotifications,markNotificationAsRead,deleteNotification,unreadNotificationCount,createOrderNotification,
}