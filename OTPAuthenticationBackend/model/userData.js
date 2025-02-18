const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: String,
  otp: String,
  otpExpiration: Date,
});

const userData = mongoose.model("user", userSchema);

module.exports = userData;
