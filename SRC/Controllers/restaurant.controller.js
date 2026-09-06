const Restaurant = require("../models/restaurant.model");

async function createRestaurant(req,res){

    try{

        const {name, email , phone,city,state , address, pincode, image, cuisine, openingTime, closingTime, rating, totalReviews, deliveryAvailable, isOpen, owner} = req.body;

        if(!name 
            || !email || !phone || !city || !state || !address || !pincode || !cuisine || !openingTime || !closingTime || !owner){
            return res.status(400).json({message:"please Provide all required all fields !! "});
        }

      const existingEmail = await Restaurant.findOne({email:email});


      if(existingEmail){

        return res.status(400).json({message:" Restaurant with this email is already exist!!"});

      }

      const existingPhone = await Restaurant . findOne({phone:phone});

      if(existingPhone){
        return res.status(400).json({message : " Restaurant with this phone number is already exist!!"});

      }

      const restaurant = await Restaurant.create({
        name,email,phone,city,state,address,pincode,image,cuisine,openingTime,closingTime,rating,totalReviews,deliveryAvailable,isOpen,owner,
          // Logged in user becomes owner
            owner: req.user._id,
      });
   
        return res.status(201).json({
            success: true,
            message: "Restaurant created successfully",
            restaurant,
        });

    }catch(error){

  return  res.status(500).json({message:error.message});
   

    }
}
async function getAllRestaurants(req,res){
  try{

    const restaurants = await Restaurant.find().populate("owner","name email phone ");
   

    return res.status(200).json({
      success: true,
      message: "Restaurants fetched successfully",
      restaurants,
    });

  }catch(error){
    return res.status(500).json({message:error.message});
  }
}
 
 //const { id } = req.params;

async function getRestaurantById(req,res){
  try{

    const restaurants = await Restaurant.findById(id).populate("owner","name email phone ");
    if(!restaurants){
      return res.status(404).json({message:"No restaurants found with this id"});
    }

    return res.status(200).json({
      success: true,
      message: "Restaurants fetched successfully",
      restaurants,
    });

  }catch(error){
    return res.status(500).json({message:error.message});
  }
}

const updateRestaurant = async(req,res)=>{

try{
const {id} = req.params;

const restaurant = await Restaurant.findById(id);
 
if(!restaurant){
  return res.status(404).json({success: false,message:"Restaurant not found"});
}

if(restaurant.owner.toString() !== req.user._id.toString()&& req.user.role!=="admin"){
  return res.status(403).json({success:false, message:"You are npt authorized to update this restaurant"});
}

const updatedRestaurant = await Restaurant.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});


return res.status(200).json({success:true,message:"Restaurant updated Successfully",restaurant:updatedRestaurant});



}catch(error){
  return res.status(500).json({message:error.message});

}


}


const deleteRestaurant= async (req,res)=>{
try{

  const {id} = req.params;
  const restaurant = await Restaurant.findById(id);

 if(!restaurant){
  return res.status(404).json({success:false,message:"Restaurant not found"});
 }

 if (
    restaurant.owner.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
){
res.status(403).json({success:false,message:"You are not authorize you can  not delete the restaurant"});
 }

 const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

res . status (201).json({success:true,message:"Now the restaurant deleted successfully !! ", restaurant: deletedRestaurant});

}catch(error){

  return res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
    });

}


}

module.exports={createRestaurant, getAllRestaurants,getRestaurantById, updateRestaurant,deleteRestaurant};