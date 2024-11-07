const mongoose = require('mongoose');
require('dotenv').config();
const express=require('express');
const {User,Post,Order,Category} = require('./userSchema.js');
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

  });
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
  

  // [
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField:"userId",
  //       foreignField: "_id" ,
  //       as: "userInfo",
  //     },
  //   },
  //   {
  //     $unwind: "$userInfo",
  //   },
  // ]

//{$addField:{"userInfo":{$first:"$userInfo"}}} or you cn use $arrayElemAt:["userInfo",0]





  // db.users.find({
  //   $expr: { $gt: [{ $size: "$addresses" }, 1] }
  // })
  


  // [{
  //   $lookup: {
  //     from: "users",
  //     localField:"userId",
  //     foreignField:"_id",
  //     as:"userInfo"
  //   }
  // },{
  //   $unwind:"$userInfo"
  // },
  // {
  //   $match: {
  //     "userInfo._id":ObjectId('672a0cf3bd146877466051f5')
  //   }
  // }]
  
  




  // [{
  //   $lookup: {
  //     from: "categories",
  //     localField:"categories",
  //     foreignField:"_id",
  //     as: "categoryDetails"
  //   }
  // },
  //  {$addFields: {
  //    "categoryDetails":{
  //       $map: {
  //               input: '$categoryDetails',
  //               as: 'category',
  //               in: '$$category.name'  // Extracts only the 'name' field from each category
  //             }
  //    }
   
  //  }},{
  //    $project: {
  //      categories:0
  //    }
  //  }]



  // [{
  //   $match: {
  //     name:"Books"
  //   }
  // },
  //   {
  //   $lookup: {
  //     from: "posts",
  //     localField:"_id",
  //     foreignField: "categories",
  //     as: "result"
  //   }
  // },{
  //   $unwind:"$result"
  // }]