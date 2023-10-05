const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("connected to db succefully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
