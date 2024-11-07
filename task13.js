const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.URI)
  .then(() => console.log("Connected to MongoDB via Mongoose"))
  .catch(err => console.error("MongoDB connection error:", err));
  const categorySchema=new mongoose.Schema({
    name:{
      type:String,
      required:true
    }
  });
  
  const Category=mongoose.model('Category',categorySchema);
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
        ref: 'Category' // Reference to the User model
      }]

});
const Post=mongoose.model('post',postSchema);
async function insertCategories() {
    try {
      const categories = [
        { name: "Electronics" },
        { name: "Computers" },
        { name: "Smartphones" },
        { name: "Fashion" },
        { name: "Home Appliances" },
        { name: "Books" },
        { name: "Furniture" }
      ];
  
      const result = await Category.insertMany(categories);
      console.log("Inserted categories:", result);
    } catch (error) {
      console.error("Error inserting categories:", error);
    }
  }

  
//   insertCategories();



async function updateRandomCategoriesInPosts() {
  try {
    const categoryIds = [
      new mongoose.Types.ObjectId('672b39f0cc5fb6ed81095d8c'), // Electronics
      new mongoose.Types.ObjectId('672b39f0cc5fb6ed81095d8d'), // Computers
      new mongoose.Types.ObjectId('672b39f0cc5fb6ed81095d8e'), // Smartphones
      new mongoose.Types.ObjectId('672b39f0cc5fb6ed81095d8f'), // Fashion
      new mongoose.Types.ObjectId('672b39f0cc5fb6ed81095d90'), // Home Appliances
      new mongoose.Types.ObjectId('672b39f0cc5fb6ed81095d91'), // Books
      new mongoose.Types.ObjectId('672b39f0cc5fb6ed81095d92'), // Furniture
    ];

    // Fetch all posts
    const posts = await Post.find();

    for (let post of posts) {
      // Select a random subset of categories for each post
      const randomCategories = getRandomCategories(categoryIds);
      await Post.updateOne({ _id: post._id }, { $set: { categories: randomCategories } });
    }

    console.log("Random categories updated for all posts successfully.");
  } catch (error) {
    console.error("Error updating random categories in posts:", error);
  }
}

// Helper function to get a random subset of categories
function getRandomCategories(categories) {
  const shuffled = categories.sort(() => 0.5 - Math.random()); // Shuffle categories
  const subsetSize = Math.floor(Math.random() * categories.length) + 1; // Random size between 1 and total categories
  return shuffled.slice(0, subsetSize); // Return random subset
}

updateRandomCategoriesInPosts();
