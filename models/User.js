const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});
userSchema.methods.genJWT = async function (id) {
  const token = jwt.sign({ userID: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};
userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};
const User = mongoose.model("users", userSchema);

module.exports = User;
