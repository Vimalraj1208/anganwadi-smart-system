const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    aadhaarNumber: {
      type: String,
      required: true,
      unique: true,
      length: 12
    },
    name: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    location: {
      type: String,
      required: true
    },
    area: {
      type: String,
      required: true
    },
    taluk: {
      type: String,
      required: true
    },
    district: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "teacher"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
