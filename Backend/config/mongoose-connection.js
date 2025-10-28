const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
// "mongodb://admin:password@localhost:27017/portfolio?authSource=admin";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("DB Connected successfully");
  })
  .catch((error) => {
    console.error("DB Connection failed:", error.message);
  });

const connection = mongoose.connection;

connection.on("error", (err) => {
  console.error("Mongoose connection error:", err.message);
});

connection.on("disconnected", () => {
  console.log("Mongoose disconnected from MongoDB");
});

module.exports = connection;
