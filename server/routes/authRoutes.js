const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// ============================
// TEACHER REGISTER
// ============================
router.post("/register", authController.register);

// ============================
// TEACHER LOGIN
// ============================
router.post("/login", authController.login);

// ============================
// FETCH AADHAAR
// ============================
router.post("/fetch-aadhaar", authController.fetchAadhaar);

module.exports = router;