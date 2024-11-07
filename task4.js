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

  //aggregation pipeline to calculate average use of all users
  async function averageAge() {
    const result =await User.aggregate([{$group:{"_id":null,"totalAvg":{$avg:"$age"}}}]);
    console.log(result);
    
  }
  averageAge();
//   aggregation pipeline to count the number of users in the "users" collection
async function countUsers(){
    const result=await User.aggregate([{$count:'countUsers'}]);
    console.log(result);
}
countUsers();

