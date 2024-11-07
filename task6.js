const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.URI)
  .then(() => console.log("Connected to MongoDB via Mongoose"))
  .catch(err => console.error("MongoDB connection error:", err));

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
    }

});
const Post=mongoose.model('post',postSchema);
async function insertPosts() {
  const result=await Post.insertMany([
    {
      title: "Getting Started with MongoDB",
      content: "This is a beginner's guide on MongoDB and how to get started.",
      userId: "6729a35ff9656cf163d1e763", // Example ObjectId, replace as needed
      tags: ["MongoDB", "Beginner"],
      likes: 10,
    },
    {
      title: "Node.js and Express Basics",
      content: "Learn the basics of building APIs with Node.js and Express.",
      userId: "6729a35ff9656cf163d1e76b",
      tags: ["Node.js", "Express", "API"],
      likes: 25,
    },
    {
      title: "Advanced Mongoose Techniques",
      content: "A deep dive into advanced Mongoose schema and query features.",
      userId: "6729a35ff9656cf163d1e766",
      tags: ["Mongoose", "Database"],
      likes: 15,
    }
  ])
  
}
// insertPosts();
// retrieve all posts along with the corresponding user information
async function displayDetails(){
  const result=await Post.aggregate([{$lookup:{from:"users",localField:"userId",foreignField:"_id",as:"userDetails"}},
{$addFields:{
  "userDetails":{$first:"$userDetails"}
}}
  ])
  console.log(result);
}
displayDetails()
