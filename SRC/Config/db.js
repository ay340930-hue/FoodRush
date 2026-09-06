const mongoose = require ("mongoose");

const connectDB = async () => {

try{
    await mongoose.connect(process.env.MONGO_URI);
    //its connect my database to the node js 
console.log("MongoDB is connect successfully!!!");
console.log("Database Name:", mongoose.connection.name);
}catch(error){

console.log("Mongo not connect Sucessfully ", error.message);
//if my server not connected to database pls stop   the server 
process.exit(1);

}


};
module.exports= connectDB;
