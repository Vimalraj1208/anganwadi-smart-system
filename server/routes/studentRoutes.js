const express = require("express");
const router = express.Router();
const { registerStudent } = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", authMiddleware, registerStudent);

module.exports = router;