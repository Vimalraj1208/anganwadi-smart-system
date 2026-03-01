const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  parentName: String,
  parentPhone: String,

  studentCode: {
    type: String,
    required: true,
    unique: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);