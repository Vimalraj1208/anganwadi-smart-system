import React, { useState, useEffect } from "react";
import "./TeacherRegister.css";

const TeacherRegister = () => {

  const [form, setForm] = useState({
    aadhaar: "",
    fullName: "",
    dob: "",
    gender: "",
    email: "",
    phoneNumber: "",
    location: "",
    area: "",
    taluk: "",
    district: "",
    username: "",
    password: "",
    rePassword: ""
  });

  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // CAPTCHA

  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let cap = "";

    for (let i = 0; i < 6; i++) {
      cap += chars[Math.floor(Math.random() * chars.length)];
    }

    setCaptcha(cap);
  };

  const speakCaptcha = () => {
    const speech = new SpeechSynthesisUtterance(captcha);
    speech.rate = 0.8;
    window.speechSynthesis.speak(speech);
  };

  // LOCATION DETECT

  const detectLocation = () => {

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {

      const { latitude, longitude } = position.coords;

      try {

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        const data = await res.json();
        const address = data.address;

        setForm((prev) => ({
          ...prev,
          location: data.display_name,
          area: address.suburb || address.village || address.hamlet || "",
          taluk: address.county || "",
          district: address.state_district || address.district || ""
        }));

      } catch {

        alert("Location detection failed");

      }

    });

  };

  // FETCH AADHAAR

  const fetchDetails = async () => {

    if (!form.aadhaar) {
      alert("Enter Aadhaar number");
      return;
    }

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/fetch-aadhaar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            aadhaarNumber: form.aadhaar
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setForm((prev) => ({
        ...prev,
        fullName: data.name || "",
        dob: data.dob || "",
        gender: data.gender || ""
      }));

    } catch {

      alert("Failed to fetch Aadhaar details");

    }

  };

  // REGISTER

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (form.password !== form.rePassword) {
      alert("Passwords do not match");
      return;
    }

    if (captcha !== captchaInput) {
      alert("Captcha incorrect");
      generateCaptcha();
      return;
    }

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            aadhaarNumber: form.aadhaar,
            name: form.fullName,
            phoneNumber: form.phoneNumber,
            email: form.email,
            location: form.location,
            area: form.area,
            taluk: form.taluk,
            district: form.district,
            username: form.username,
            password: form.password

          })

        }
      );

      const data = await res.json();

      if (res.ok) {

        alert("Teacher Registered Successfully");

      } else {

        alert(data.message);

      }

    } catch {

      alert("Server Error");

    }

  };

  return (

    <div className="teacher-container">

      <div className="teacher-card">

        <div className="teacher-title">Register</div>

        {/* Aadhaar */}

        <div className="aadhaar-row">

          <input
            type="text"
            name="aadhaar"
            placeholder="Enter Aadhaar Number"
            value={form.aadhaar}
            onChange={handleChange}
          />

          <button className="fetch-btn" onClick={fetchDetails}>
            Fetch Details
          </button>

        </div>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          readOnly
        />

        <input
          type="date"
          name="dob"
          value={form.dob}
          readOnly
        />

        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={form.gender}
          readOnly
        />

        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email id"
          value={form.email}
          onChange={handleChange}
        />

        {/* LOCATION */}

        <div className="location-row">

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            readOnly
          />

          <button className="location-btn" onClick={detectLocation}>
            Detect
          </button>

        </div>

        <input
          type="text"
          name="area"
          placeholder="Area"
          value={form.area}
          onChange={handleChange}
        />

        <input
          type="text"
          name="taluk"
          placeholder="Taluk"
          value={form.taluk}
          onChange={handleChange}
        />

        <input
          type="text"
          name="district"
          placeholder="District"
          value={form.district}
          onChange={handleChange}
        />

        <input
          type="text"
          name="username"
          placeholder="Create Username"
          value={form.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={form.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="rePassword"
          placeholder="Re-enter Password"
          value={form.rePassword}
          onChange={handleChange}
        />

        {/* CAPTCHA */}

        <div className="captcha-box">

          <span className="captcha-text">{captcha}</span>

          <div className="captcha-actions">
            <button type="button" onClick={generateCaptcha}>🔄</button>
            <button type="button" onClick={speakCaptcha}>🔊</button>
          </div>

        </div>

        <input
          type="text"
          placeholder="Enter Captcha"
          value={captchaInput}
          onChange={(e) => setCaptchaInput(e.target.value)}
        />

        <button className="register-btn" onClick={handleSubmit}>
          Register
        </button>

      </div>

    </div>

  );

};

export default TeacherRegister;