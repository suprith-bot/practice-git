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

  const orderSchema = new mongoose.Schema({
    orderNumber: {
      type: String,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Refers to the User collection
      required: true
    },
    orderDate: {
      type: Date,
      default: Date.now
    }
  });
  const Order = mongoose.model('Order', orderSchema);

  //retrieve all orders along with the corresponding user information (join between the "orders" and "users" collections).

  async function allOrders() {
    const result=await Order.aggregate(  [
        {
          $lookup: {
            from: "users",
            localField:"userId",
            foreignField: "_id" ,
            as: "userInfo",
          },
        },
        {
          $unwind: "$userInfo",
        },
      ]);
        console.log(result);
    
}
// allOrders();

//retrieve all orders for a specific user.
async function ordersFromUser() {
const user=await User.findOne({'name':"Alice"})
// console.log(user);
if (!user) {
    console.log("User not found");
    return;
}
const result=await Order.find({userId:user._id})
    console.log(result);
    
}
ordersFromUser();
