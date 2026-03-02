const Student = require("../models/student");
const QRCode = require("qrcode");

// Register Student
exports.registerStudent = async (req, res) => {
  try {
    const data = req.body;

    // Generate Unique Student ID
    const count = await Student.countDocuments();
    const year = new Date().getFullYear().toString().slice(-2);

    const studentId = `ANGAN2K${year}${(count + 1)
      .toString()
      .padStart(3, "0")}`;

    // Generate QR Code
    const qrCode = await QRCode.toDataURL(studentId);

    const student = await Student.create({
      ...data,
      studentId,
      qrCode,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Student Registered Successfully",
      student
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};