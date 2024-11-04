const mongoose = require('mongoose');
require('dotenv').config();
const express=require('express');
const app= express();
app.use(express.json());



// Connect to MongoDB using Mongoose
mongoose.connect(process.env.URI)
  .then(() => console.log("Connected to MongoDB via Mongoose"))
  .catch(err => console.error("MongoDB connection error:", err));
  
  
  const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email:String
  });
 // const userCollection = mongoose.connection.useDb('test')

  
  const User = mongoose.model('User', userSchema); // 'User' will correspond to the 'users' collection
  



  app.get('/',async (req,res)=>{
    const result = await User.find();
    res.status(200).json(result);

  })
  app.post('/insertOne',async (req,res)=>{
    const name=req.body.name;
    const age=req.body.age;
    const email=req.body.email;
    const user=new User({"name":name,"age":age,"email":email});

    const result=await user.save()
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
  
  const result=await User.findByIdAndUpdate(req.params.id,{age:50},{new:true});
  res.status(201).json(result);

});

  
  // Call function to fetch users

 


  app.listen(3000,()=>{
    console.log("server is running http://localhost:3000");
  });
 












