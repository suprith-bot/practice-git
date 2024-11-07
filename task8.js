const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.URI)
  .then(() => console.log("Connected to MongoDB via Mongoose"))
  .catch(err => console.error("MongoDB connection error:", err));


  const postSchema=new mongoose.Schema({
    title:String,
    content:String,
    userId:{ type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tags: [String], // Array of tags related to the post
    likes: {
      type: Number,
      default: 0,
    }

});
const Post=mongoose.model('post',postSchema);

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email:String
  });
  const User = mongoose.model('User', userSchema); 
//trying write access
  async function updateAgeUser(){
    try{
    const result=await User.findByIdAndUpdate("6729a35ff9656cf163d1e76b",{age:40},{new:true});
    if (result) {
        console.log(result)
 
    } else {
      console.log('User not found');
    }
  
    }
    catch(err){
        console.log(err);
    }
}

   
updateAgeUser();
//read access to users
async function displayDetails() {
    try{
        const result= await User.find();
        console.log(result);

    }
    catch(err){
        console.log(err);
    }
    
}
displayDetails()
async function postRead(){
//trying read access to other collection
try{
    const result= await Post.find();
    console.log(result);

}
catch(err){
    console.log(err);
}}
postRead();
