const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

  aadhaarNumber: {
    type: String,
    required: true,
    unique: true
  },

  fullName: String,
  dob: Date,
  gender: String,

  fatherName: String,
  motherName: String,

  fatherNumber: String,
  motherNumber: String,

  email: String,
  location: String,

  height: Number,
  weight: Number,

  studentId: {
    type: String,
    unique: true
  },

  qrCode: String,

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  }

}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);