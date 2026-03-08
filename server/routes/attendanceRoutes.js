const express = require("express");
const router = express.Router();

// Controllers
const {
  markAttendance,
  todayStats
} = require("../controllers/attendanceController");


// =============================
// MARK ATTENDANCE (QR Scan)
// =============================
router.post("/mark", markAttendance);


// =============================
// TODAY DASHBOARD STATS
// =============================
router.get("/today", todayStats);


module.exports = router;