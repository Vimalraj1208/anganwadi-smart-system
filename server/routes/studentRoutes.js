const express = require("express");
const router = express.Router();
const Student = require("../models/student");


// REGISTER STUDENT
router.post("/register", async (req, res) => {

  try {

    const { aadhaarNumber } = req.body;

    // duplicate check
    const existing = await Student.findOne({ aadhaarNumber });

    if (existing) {
      return res.status(400).json({
        message: "Student already registered with this Aadhaar"
      });
    }

    const student = new Student(req.body);

    await student.save();

    res.status(201).json({
      message: "Student Registered Successfully",
      student
    });

  } catch (error) {

    console.log("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});


// GET ALL STUDENTS
router.get("/all", async (req, res) => {

  try {

    const students = await Student.find();

    res.json(students);

  } catch (err) {

    res.status(500).json({
      message: "Server error"
    });

  }

});

module.exports = router;