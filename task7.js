const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

mongoose.connect(process.env.URI)
  .then(() => console.log("Connected to MongoDB via Mongoose"))
  .catch(err => console.error("MongoDB connection error:", err));


  
  async function backupDatabase() {
      try {

  
          // Get all collections
          const collections = await mongoose.connection.db.listCollections().toArray();
  
          for (let collection of collections) {
              const collectionName = collection.name;
              const docs = await mongoose.connection.db.collection(collectionName).find().toArray();
              
              // Save each collection as a JSON file
              fs.writeFileSync(path.join(__dirname, `${collectionName}.json`), JSON.stringify(docs, null, 2));
          }
  
          console.log("Backup complete!");
      } catch (error) {
          console.error("Error backing up database:", error);
      } finally {
          mongoose.connection.close();
      }
  }
  
  backupDatabase();
  

  async function dropDatabase() {
    try {
        await mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true });
        
        await mongoose.connection.db.dropDatabase();
        console.log("Database dropped successfully!");
    } catch (error) {
        console.error("Error dropping database:", error);
    } finally {
        mongoose.connection.close();
    }
}

dropDatabase();

async function restoreDatabase() {
    try {
        await mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true });

        const files = fs.readdirSync(__dirname);

        for (let file of files) {
            if (file.endsWith('.json')) {
                const collectionName = file.split('.json')[0];
                const data = JSON.parse(fs.readFileSync(path.join(__dirname, file), 'utf-8'));
                
                // Insert documents back into the collection
                await mongoose.connection.db.collection(collectionName).insertMany(data);
            }
        }

        console.log("Database restore complete!");
    } catch (error) {
        console.error("Error restoring database:", error);
    } finally {
        mongoose.connection.close();
    }
}

restoreDatabase();
