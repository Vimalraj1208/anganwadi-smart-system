const Student = require("../models/student");
const QRCode = require("qrcode");

exports.registerStudent = async (req, res) => {
  try {

    const data = req.body;

    console.log("Received Data:", data);

    // username = studentId
    const studentId = data.username;

    // QR generate
    const qrCode = await QRCode.toDataURL(studentId);

    const student = new Student({
      aadhaarNumber: data.aadhaarNumber,
      fullName: data.fullName,
      fatherName: data.fatherName,
      motherName: data.motherName,
      fatherNumber: data.fatherNumber,
      motherNumber: data.motherNumber,
      gender: data.gender,
      dob: data.dob,
      email: data.email,
      height: data.height,
      weight: data.weight,
      studentId: studentId,
      qrCode: qrCode
    });

    await student.save();

    console.log("Student Saved:", student);

    res.status(201).json({
      message: "Student Registered",
      student
    });

  } catch (error) {

    console.log("Error:", error);

    res.status(500).json({
      message: error.message
    });

  }
};