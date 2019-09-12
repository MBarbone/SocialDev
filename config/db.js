require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err.message);
    // Exit process with failture
    process.exit(1);
  }
};

module.exports = connectDB;
