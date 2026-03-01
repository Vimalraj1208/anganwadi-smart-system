const mongoose = require("mongoose");

const aadhaarSchema = new mongoose.Schema({
  aadhaarNumber: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  dob: String,
  gender: String,
  address: String,
  location: String
});

module.exports = mongoose.model("Aadhaar", aadhaarSchema);