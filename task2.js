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
//displaying all users
async function displayUsers(){
    const result =await User.find();
    console.log(result);
}
// displayUsers();
//displaying users who have age greater than 30
async function  userAge() {
    

const result=await User.find({'age':{$gt:30}});
console.log(result);

}
userAge();

//users with specific email domain
async function emails(){
    const result =await User.find({'email':/@example\.com$/i});
   console.log(result);
}
// emails();

//sorting based on alphabetical order
async function sort() {
    const result=await User.find().sort({'name':1});
    console.log(result);
    
    
}
// sort();

