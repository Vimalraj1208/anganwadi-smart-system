const express = require("express");
const { markAttendance } = require("../controllers/attendanceController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/mark", protect, markAttendance);

module.exports = router;