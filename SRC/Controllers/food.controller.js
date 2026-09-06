const Food = require("../models/food.model");

const createFood = async (req,res)=>{

    try{
const {name ,description,price,image,category,isVeg,preparationTime,restaurant} = req.body;

 if(!name || !description || !price || !image || !category || !isVeg==undefined || !preparationTime || !restaurant){
    return res.status(400).json({success:false,message:"Please provide all required fields !!"});
 }

 if (!isVeg) {
    return res.status(400).json({
        message: "Please provide all required fields."
    });
}

const food = await Food.create({
    name,description,price,image,category,isVeg,preparationTime,restaurant,
});

return res.status(201).json({
    success:true,
    message:"Food created successfully",
    food,

});

    }catch(error){


        return res.status(500).json({success:true,message:error.message});

    }
}


const getAllFoods = async(req,res)=>{

try{

const foods = await Food.find();

return res.status(200).json({

    success:true,
    message:"Food is Sccessfully Fetched",
    count:foods.length,
    foods,


});


}catch(error){


return res.status(500).json({success:true,message:error.message});

}


}

const getFoodById = async(req,res)=>{

try{

const {id} = req.params;

const food = await Food.findById(id);
if(!food){
    return res.status(404).json({success:false,message:"Food not found"});
}

return res.status(200).json({
    success:true,
    message:"Food is Sccessfully Fetched",
    food,
});

}catch(error){


return res.status(500).json({success:true,message:error.message});

}
}

const updateFood = async (req,res)=>{

try{

    const {id} = req.params;

    const food = await Food.findById(id).populate({
   path: "restaurant",
    select: "owner name"
    });

    if(!food){
        return res.status(404).json({success:false,message:"Food not Found !!"});
    }

 if(food.restaurant.owner.toString() !== req.user._id.toString() && req.user.role !== "admin"){
    return res.status(402).json({
   success : false,
   message: " User cant update the food becuase user not authorize !!",

    });



 }

 const updatedFood = await Food.findByIdAndUpdate( id,
    req.body,{
         new: true,
        runValidators: true,
    });
    return res.status (201).json({
        success:true ,
        message:" Food Successfully Updated!!",
    });

}catch(error){

return res.status(500).json({success:false,message:error.message});

}
}

const deleteFood = async (req, res) => {
    try {

        const { id } = req.params;

        const food = await Food.findById(id).populate({
            path: "restaurant",
            select: "owner name",
        });

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found",
            });
        }

        if (
            food.restaurant.owner.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "User is not authorized to delete this food item.",
            });
        }

        await food.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Food deleted successfully",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};



module.exports = {

    createFood,getAllFoods,getFoodById,updateFood,deleteFood,
}