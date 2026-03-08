const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
{
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

  date: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["present", "absent"],
    default: "present"
  },

  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  }

},
{ timestamps: true }
);

// Prevent duplicate attendance per day
attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);