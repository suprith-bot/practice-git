const mongoose = require('mongoose');
//master comment
require('dotenv').config();
const express=require('express');
const {User,Post,order} = require('./userSchema.js');
const app= express();
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.URI)
  .then(() => console.log("Connected to MongoDB via Mongoose"))
  .catch(err => console.error("MongoDB connection error:", err));
  
  

 // const userCollection = mongoose.connection.useDb('test')
app.post('/insertPost',async (req,res)=>{
    const post =new Post({"title":req.body.title,"content":req.body.content,"userId":new mongoose.Types.ObjectId(req.body._id),
      "tags":req.body.tags||[],"likes":req.body.likes||0
    });
    const result=await post.save();
    res.status(201).json(result);

  });

  //joining the user collection
  app.get('/join',async(req,res)=>{
    const result=await Post.aggregate([{$lookup:
      {from:"users",localField:"userId",foreignField:"_id",as:"userInfo"}},
      {$unwind:'$userInfo'}
    ]);
    res.status(200).json(result);
  });



  app.get('/',async (req,res)=>{
    const result = await User.find();
    res.status(200).json(result);

  })
  app.post('/insertOne',async (req,res)=>{
    const name=req.body.name;
    const age=req.body.age;
    const email=req.body.email;
    const address={
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode
  };
    const user=new User({"name":name,"age":age,"email":email,"address":[address]});

    const result=await user.save();
    res.status(201).json(result);
  });

  app.get('/age',async (req,res)=>{
    const result=await User.find({'age':{$gt:30}});
    res.status(200).json(result);

});
app.get('/sort',async (req,res)=>{
  const result=await User.find().sort({'name':1});
  res.status(200).json(result);
});
app.get('/email',async (req,res)=>{
  const result =await User.find({'email':/s(.)*@gmail\.com$/i});
  res.status(200).json(result);
});

app.post('/updatePost',async (req,res)=>{
  
  const result=await User.findByIdAndUpdate(req.query.id,{age:50},{new:true});
  if (result) {
    res.status(201).json(result);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
 

});
app.post('/deleteUser',async function deleteUser(req,res){
  const result=await User.deleteOne({_id:"6721db6124c1ba12beb610da"});
  res.status(200).json(result);

});
//data aggregation
  app.get('/avg',async (req,res)=>{
    const result =await User.aggregate([{$group:{"_id":null,"totalAvg":{$avg:"$age"}}}]);
    res.status(200).json(result);
  });
  app.get('/userCount',async (req,res)=>{

    const result=await User.aggregate([{$group:{"_id":null,"count OF  Users":{$sum:1}}}])
    // const result=await User.aggregate([{$match:{}},{$count:"count Of users"}]);
    res.status(200).json(result);
  });


  // Call function to fetch users

 


  app.listen(3000,()=>{
    console.log("server is running http://localhost:3000");
  });
 



  // [{$unwind:"$addresses"},
  //   {$match: {
  //     "addresses.city":"Chicago"
  //   }}]
  // db.users.find({ "addresses.1": { $exists: true } })
  // db.users.find({
  //   $where: "this.addresses.length > 1"
  // })
  

  async function seedData() {
    try {
      await mongoose.connect(process.env.URI);
  
      // Insert users
      const users = await User.insertMany([
        {
          name: "Alice Smith",
          age: 30,
          email: "alice@example.com",
          addresses: [
            { street: "123 Maple St", city: "Springfield", state: "IL", zip: "62704" },
            { street: "456 Oak St", city: "Greenfield", state: "WI", zip: "53220" }
          ]
        },
        {
          name: "Bob Johnson",
          age: 45,
          email: "bob@example.com",
          addresses: [
            { street: "789 Pine St", city: "Madison", state: "WI", zip: "53703" }
          ]
        },
        {
          name: "Charlie Brown",
          age: 35,
          email: "charlie@example.com",
          addresses: [
            { street: "101 Elm St", city: "Mapleton", state: "IL", zip: "61547" },
            { street: "202 Birch St", city: "Westfield", state: "IN", zip: "46074" }
          ]
        }
      ]);
  
      console.log("Users inserted:", users);
  
      // Insert orders
      const orders = await order.insertMany([
        {
          orderNumber: "ORD001",
          totalAmount: 150.75,
          userId: users[0]._id,
          orderDate: new Date("2024-11-01T08:00:00Z")
        },
        {
          orderNumber: "ORD002",
          totalAmount: 200.50,
          userId: users[1]._id,
          orderDate: new Date("2024-11-02T09:00:00Z")
        },
        {
          orderNumber: "ORD003",
          totalAmount: 85.00,
          userId: users[2]._id,
          orderDate: new Date("2024-11-03T10:00:00Z")
        }
      ]);
  
      console.log("Orders inserted:", orders);
    } catch (error) {
      console.error("Error seeding data:", error);
    } finally {
      await mongoose.disconnect();
    }
  }
  
  seedData();

  
  
  




