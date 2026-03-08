const Attendance = require("../models/attendance");
const Student = require("../models/student");

// FIX fetch for NodeJS
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));


// =========================
// MARK ATTENDANCE
// =========================

exports.markAttendance = async (req, res) => {

  try {

    const { studentId } = req.body;

    // find student
    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    const today = new Date().toISOString().split("T")[0];

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);


    // check already marked
    const exist = await Attendance.findOne({
      studentId: student._id,
      date: {
        $gte: today,
        $lt: tomorrow
      }
    });

    if (exist) {
      return res.json({
        message: "Already marked"
      });
    }


    // save attendance
    const attendance = new Attendance({
      studentId: student._id,
      date: today,
      status: "present"
    });

    await attendance.save();


    // =========================
    // SEND DATA TO N8N
    // =========================

    await fetch("http://localhost:5678/webhook/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        studentName: student.fullName,
        fatherNumber: student.fatherNumber,
        status: "Present",
        time: new Date()
      })
    });


    res.json({
      message: "Attendance Marked"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

};



// =========================
// TODAY DASHBOARD STATS
// =========================

exports.todayStats = async (req, res) => {

  try {

    const today = new Date().toISOString().split("T")[0];

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const total = await Student.countDocuments();

    const present = await Attendance.countDocuments({
      date: {
        $gte: today,
        $lt: tomorrow
      }
    });

    res.json({
      total,
      present,
      absent: total - present
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

};