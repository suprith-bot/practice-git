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
      age: { type:Number,
        min: [18, 'Age must be at least 18'], // Enforces a minimum age of 18
        max: [100, 'Age must be less than 100']},
        email:{type:String,
            match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']},
      addresses:[addressSchema]
    });
    userSchema.index({ email: 1 }, { unique: true });

    const User = mongoose.model('User', userSchema); 
    async function testValidation() {
        try {
            // First insert
            await User.create({ name: "ram", age: 30, email: "aliceexample.com" });
            console.log("First user created");
    
            // Attempt to insert another user with the same email
            await User.create({ name: "Bob", age: 25, email: "alice@example.com" });
            console.log("Second user created");
        } catch (error) {
            console.error("Validation Error:", error.message);
        }
    }
    
    testValidation();
    

  