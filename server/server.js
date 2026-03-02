const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect Database
connectDB();

// Initialize app
const app = express();

// ======================
// GLOBAL MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// ROUTES IMPORT
// ======================
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const studentRoutes = require("./routes/studentRoutes");

// ======================
// ROOT ROUTE
// ======================
app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 Anganwadi Backend Running",
    status: "Success"
  });
});

// ======================
// API ROUTES
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/students", studentRoutes);

// ======================
// 404 HANDLER (MUST BE LAST)
// ======================
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found"
  });
});

// ======================
// GLOBAL ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error"
  });
});

// ======================
// SERVER START
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});