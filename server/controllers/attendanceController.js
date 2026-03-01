const Attendance = require("../models/attendance");
const Student = require("../models/student");

exports.markAttendance = async (req, res) => {
  try {
    const { studentCode } = req.body;

    // 1️⃣ Check studentCode provided
    if (!studentCode) {
      return res.status(400).json({
        message: "Student code is required"
      });
    }

    // 2️⃣ Find student using studentCode
    const student = await Student.findOne({ studentCode });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // 3️⃣ Set today date (00:00:00 format)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 4️⃣ Check duplicate attendance
    const existing = await Attendance.findOne({
      studentId: student._id,
      date: today
    });

    if (existing) {
      return res.status(400).json({
        message: "Attendance already marked today"
      });
    }

    // 5️⃣ Create attendance
    const attendance = await Attendance.create({
      studentId: student._id,
      date: today,
      markedBy: req.user.id
    });

    res.status(201).json({
      message: "Attendance Marked Successfully",
      attendance
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};