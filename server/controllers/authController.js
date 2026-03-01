const Teacher = require("../models/teacher");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Aadhaar = require("../models/aadhaar");
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1️⃣ Check teacher exists
    const teacher = await Teacher.findOne({ username });

    if (!teacher) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, teacher.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3️⃣ Generate token
    const token = jwt.sign(
      { id: teacher._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Successful",
      token
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.register = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    const existingTeacher = await Teacher.findOne({ username });

    if (existingTeacher) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await Teacher.create({
      name,
      username,
      password: hashedPassword,
      role: "teacher"
    });

    res.status(201).json({
      message: "Teacher Registered Successfully",
      teacher
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.fetchAadhaar = async (req, res) => {
  try {
    const { aadhaarNumber } = req.body;

    const aadhaar = await Aadhaar.findOne({ aadhaarNumber });

    if (!aadhaar) {
      return res.status(404).json({
        message: "Aadhaar not found"
      });
    }

    res.json(aadhaar);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};