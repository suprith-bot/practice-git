const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.URI)
  .then(() => console.log("Connected to MongoDB via Mongoose"))
  .catch(err => console.error("MongoDB connection error:", err));

  const users = [
    {"name": "John", "email": "john@example.com"},
    {"name": "Alice", "email": "alice@example.com"},
    {"name": "Bob", "email": "bob@example.com"}
];

const userSchema = new mongoose.Schema({
    name: String,
    age:{ type:Number,
    min: [18, 'Age must be at least 18'], // Enforces a minimum age of 18
    max: [100, 'Age must be less than 100']
  },
    email:{type:String,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']}
  });
  
const User = mongoose.model('User', userSchema); 
async function insertMany() {    

  const result=await User.insertMany(users);
  console.log(result)
}
// insertMany();

const user = { name: "Charlie", email: "charlie@example.com", age: 5 };

async function insertOne() {
  try {
    const result = await User.create(user); // Inserts one document
    console.log("User inserted successfully:", result);
  } catch (err) {
    console.error("Error inserting user:", err);
  }
}

insertOne();


// async function insertOne() {
//     try {
//       const user = new User({ name: "Charlie", email: "charlie@example.com", age: 32 });
//       const result = await user.save(); // Saves the document instance
//       console.log("User inserted successfully:", result);
//     } catch (err) {
//       console.error("Error inserting user:", err);
//     }
//   }
  
