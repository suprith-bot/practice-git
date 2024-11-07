const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.URI)
  .then(() => console.log("Connected to MongoDB via Mongoose"))
  .catch(err => console.error("MongoDB connection error:", err));

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

async function insertOrders() {
    

const users = await User.find().limit(3);

    if (users.length < 3) {
      console.log("Not enough users found to insert orders.");
      return;
    }

    // Create sample orders
    const ordersData = [
      {
        orderNumber: 'ORD001',
        totalAmount: 150.75,
        userId: users[0]._id
      },
      {
        orderNumber: 'ORD002',
        totalAmount: 200.50,
        userId: users[1]._id
      },
      {
        orderNumber: 'ORD003',
        totalAmount: 85.00,
        userId: users[2]._id
      }
    ];

    // Insert orders into the database
    const insertedOrders = await Order.insertMany(ordersData);
    console.log('Inserted Orders:', insertedOrders);
}
insertOrders();

