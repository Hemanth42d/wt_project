require("dotenv").config();
const mongoose = require("mongoose");

async function fixIndexes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;
    const collection = db.collection("users");

    // Get existing indexes
    const indexes = await collection.indexes();
    console.log("Existing indexes:", indexes);

    // Drop the problematic mobile index if it exists
    try {
      await collection.dropIndex("mobile_1");
      console.log("Dropped mobile_1 index successfully");
    } catch (error) {
      if (error.code === 27) {
        console.log("mobile_1 index doesn't exist, nothing to drop");
      } else {
        console.log("Error dropping index:", error.message);
      }
    }

    // Optionally, you can also drop all documents and start fresh
    // await collection.deleteMany({});
    // console.log("Cleared all users");

    console.log("Index fix completed");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

fixIndexes();
