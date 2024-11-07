const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.URI)
  .then(() => console.log("Connected to MongoDB via Mongoose"))
  .catch(err => console.error("MongoDB connection error:", err));


const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email:String
  });
  const User = mongoose.model('User', userSchema); 

async function deleteUser(){try{
  const result=await User.deleteOne({_id:"6721db6124c1ba12beb610da"});
  console.log(result);}
  catch(err){
    console.log(err);
    
  }
}
deleteUser();
async function updateAgeUser(){
  const result=await User.findByIdAndUpdate("6729a35ff9656cf163d1e76b",{age:50},{new:true});
  if (result) {
   console.log(result);
  } else {
    console.log('User not found');
  }
}
updateAgeUser();

