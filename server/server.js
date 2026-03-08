const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST"]
  }
});

app.set("io",io);

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
  res.json({
    message: "🚀 Anganwadi Backend Running"
  });
});

// ======================
// API ROUTES
// ======================

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/students", studentRoutes);

// ======================
// SOCKET CONNECTION
// ======================

io.on("connection",(socket)=>{
  console.log("Teacher Connected");
});

// ======================
// SERVER START
// ======================

const PORT = process.env.PORT || 5000;

server.listen(PORT,()=>{
  console.log(`🔥 Server running on port ${PORT}`);
});