const mongoose = require('mongoose');


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
    },
    categories:[{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
      }]

});


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

const categorySchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  }
});

const Category=mongoose.model('Category',categorySchema);
const Order = mongoose.model('Order', orderSchema);
const User = mongoose.model('User', userSchema); 
// 'User' will correspond to the 'users' collection
const Post=mongoose.model('post',postSchema);
module.exports={User,Post,Order,Category};