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


//   retrieve all posts along with their associated categories.
async function postsWithCategories() {
    const result=await Post.aggregate(  [{
        $lookup: {
          from: "categories",
          localField:"categories",
          foreignField:"_id",
          as: "categoryDetails"
        }
      },
       {$addFields: {
         "categoryDetails":{
            $map: {
                    input: '$categoryDetails',
                    as: 'category',
                    in: '$$category.name' 
                  }
         }
       
       }}
       ,{
         $project: {
           categories:0
         }
       }]
    );
    console.log(result);
    
    
}
// postsWithCategories();

//retrieve all posts in a specific category
async function postsOfSpeificCategory() {
    const result=await Category.aggregate(  [{
        $match: {
          name:"Books"
        }
      },
        {
        $lookup: {
          from: "posts",
          localField:"_id",
          foreignField: "categories",
          as: "result"
        }}
    //   ,{
    //     $unwind:"$result"
    //   }
    ]
    );
    console.log(JSON.stringify(result));
    
    
}
postsOfSpeificCategory();
