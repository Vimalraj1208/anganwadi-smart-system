const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/angan", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const AttendanceSchema = new mongoose.Schema({
  studentId: String,
  date: String,
  checkIn: String,
  checkOut: String,
  present: Boolean,
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

app.post("/api/entry", async (req, res) => {
  const { studentId, direction } = req.body;

  const today = new Date().toISOString().split("T")[0];
  const time = new Date().toLocaleTimeString();

  let record = await Attendance.findOne({ studentId, date: today });

  if (!record) {
    record = new Attendance({
      studentId,
      date: today,
      present: true,
    });
  }

  if (direction === "Check-In") {
    record.checkIn = time;
  } else {
    record.checkOut = time;
  }

  await record.save();

  res.json({ message: "Attendance updated" });
});

app.get("/api/monthly/:studentId", async (req, res) => {
  const records = await Attendance.find({
    studentId: req.params.studentId,
  });
  res.json(records);
});

app.listen(5000, () => console.log("Server running on port 5000"));