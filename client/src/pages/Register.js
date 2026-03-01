import React, { useState, useEffect } from "react";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    aadhaar: "",
    name: "",
    dob: "",
    gender: "",
    address: "",
    location: "",
    username: "",
    password: "",
    rePassword: ""
  });

  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  // Generate Captcha
  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Dummy Aadhaar Auto-fill
  const fetchAadhaarDetails = () => {
    if (formData.aadhaar.length !== 12) {
      alert("Enter valid 12-digit Aadhaar");
      return;
    }

    // Temporary dummy autofill
    setFormData({
      ...formData,
      name: "Demo User",
      dob: "2000-01-01",
      gender: "Male",
      address: "Tamil Nadu",
      location: "Chennai"
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password !== formData.rePassword) {
      alert("Passwords do not match");
      return;
    }

    if (captchaInput !== captcha) {
      alert("Captcha Incorrect");
      generateCaptcha();
      return;
    }

    alert("Registered Successfully ✅");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>

        <form onSubmit={handleRegister}>

          {/* Aadhaar First */}
          <input
            type="text"
            name="aadhaar"
            placeholder="Enter Aadhaar Number"
            value={formData.aadhaar}
            onChange={handleChange}
            required
          />

          <button type="button" onClick={fetchAadhaarDetails}>
            Fetch Details
          </button>

          {/* Auto-filled Fields */}
          <input
  type="text"
  name="name"
  placeholder="Full Name"
  value={formData.name}
  readOnly
/>

<input
  type="date"
  name="dob"
  value={formData.dob}
  readOnly
/>

<input
  type="text"
  name="gender"
  placeholder="Gender"
  value={formData.gender}
  readOnly
/>

<textarea
  name="address"
  placeholder="Address"
  value={formData.address}
  readOnly
/>

<input
  type="text"
  name="location"
  placeholder="Location"
  value={formData.location}
  readOnly
/>
          {/* Account Creation Fields at Last */}
          <input
            type="text"
            name="username"
            placeholder="Create Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="rePassword"
            placeholder="Re-enter Password"
            value={formData.rePassword}
            onChange={handleChange}
            required
          />

          {/* Captcha */}
          <div className="captcha-box">
            <span className="captcha-text">{captcha}</span>
            <button type="button" onClick={generateCaptcha}>↻</button>
          </div>

          <input
            type="text"
            placeholder="Enter Captcha"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;