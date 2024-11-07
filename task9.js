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



const appendAddressToUser = async (newAddress) => {
    try {
        const result = await User.updateMany(
            {},
            { $push: { addresses: newAddress } },
            { new: true }
        );

        console.log("User after appending address:", result);
    } catch (error) {
        console.error("Error appending address:", error);
    }
};
appendAddressToUser({
    street: "202 Maple St",
    city: "Chicago",
    state: "IL",
    zipCode: "60616"
});

  