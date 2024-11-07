
// db.users.updateMany({"_id":ObjectId("6729a35ff9656cf163d1e76c")},{$push:{addresses:{$each: [
//   {
//       street: "789 Elm St",
//       city: "Los Angeles",
//       state: "CA",
//       zipCode: "90001"
//   },
//   {
//       street: "101 Pine St",
//       city: "San Francisco",
//       state: "CA",
//       zipCode: "94107"
//   }
// ]}}});
// db.users.find({ "_id": ObjectId("6729a35ff9656cf163d1e76c") });

// db.users.getIndexes()

// // db.getCollection("users").createIndex({"email":1});

// // Insert a few documents into the sales collection.
// db.getCollection('posts').insertMany([
//     {
//       title: "Getting Started with MongoDB",
//       content: "This is a beginner's guide on MongoDB and how to get started.",
//       userId: ObjectId("6721db3b24c1ba12beb5f867"), // Example ObjectId, replace as needed
//       tags: ["MongoDB", "Beginner"],
//       likes: 10,
//     },
//     {
//       title: "Node.js and Express Basics",
//       content: "Learn the basics of building APIs with Node.js and Express.",
//       userId: ObjectId("6729a3e4aa8c94b0ed053c31"),
//       tags: ["Node.js", "Express", "API"],
//       likes: 25,
//     },
//     {
//       title: "Advanced Mongoose Techniques",
//       content: "A deep dive into advanced Mongoose schema and query features.",
//       userId: ObjectId("6729a3e4aa8c94b0ed053c37"),
//       tags: ["Mongoose", "Database"],
//       likes: 15,
//     }
//   ]);
//   db.users.updateMany({"email":/@example\.com$/},{$push:{addresses:{
//     street: "202 Maple St",
//     city: "Chicago",
//     state: "IL",
//     zipCode: "60616"
// }}},{new:true});

// db.users.aggregate([
//     {
//       $match: {
//         addresses: { $exists: true, $not: { $size: 0 } }
//       }
//     },
//     {
//       $project: {
//         addressesCount: { $size: "$addresses" }
//       }
//     },
//     {
//       $match: {
//         addressesCount: { $gt: 1 }
//       }
//     }
//   ])


  

db.users.unhideIndex('email_1');
db.users.hideIndex('email_1');
use('mongodbVSCodePlaygroundDB');
db.users.find({'email':/(.)*@example\.com$/}).explain()


