const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.URI)
  .then(() => console.log("Connected to MongoDB via Mongoose"))
  .catch(err => console.error("MongoDB connection error:", err));
 
    const addressSchema=new mongoose.Schema({
        street: String,
        city: String,
        state: String,
        zipCode: String
      });
      const userSchema = new mongoose.Schema({
          name: String,
          age: Number,
          email:String,
          addresses:[addressSchema]
        });
    const User = mongoose.model('User', userSchema); 
   
    //displaying users of a specific  city
async function usersSpecificcCity(city) {
    const result=await User.find({"addresses":{$elemMatch:{"city":city}}});
    // User.aggregate( [{$unwind:"$addresses"},
    //     {$match: {
    //       "addresses.city":city
    //     }}])
        console.log(result);
    
}


// usersSpecificcCity("Chicago")


// query to retrieve all users who have multiple addresses.

  async function usersWithMoreAddress() {
    const result=await User.find({
        $expr: { $gt: [{ $size: "$addresses" }, 1] }
      });
        console.log(result);
    
}
usersWithMoreAddress()