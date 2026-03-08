import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import bgImage from "../assets/bg.jpg";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");

  // ======================
  // GENERATE CAPTCHA
  // ======================

  const generateCaptcha = () => {

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let newCaptcha = "";

    for (let i = 0; i < 6; i++) {
      newCaptcha += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    setCaptcha(newCaptcha);

  };

  const speakCaptcha = () => {

    const speech = new SpeechSynthesisUtterance(captcha);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);

  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // ======================
  // HANDLE INPUT
  // ======================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // ======================
  // LOGIN FUNCTION
  // ======================

  const handleLogin = async (e) => {

    e.preventDefault();

    if (userCaptcha !== captcha) {
      alert("Captcha incorrect!");
      generateCaptcha();
      return;
    }

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: form.username,
            password: form.password
          })
        }
      );

      const data = await res.json();

      if (res.ok) {

        alert("Login Successful");
        localStorage.setItem("username", form.username);

        // Save JWT token
        localStorage.setItem("token", data.token);

        // Redirect to Home page
        navigate("/");

      } else {

        alert(data.message);

      }

    } catch {

      alert("Server Error");

    }

  };

  return (

    <div
      className="login-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >

      <div className="login-box">

        <h2>LOGIN</h2>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <div className="password-wrapper">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️‍🗨️" : "👁️"}
            </span>

          </div>

          {/* CAPTCHA */}

          <div className="captcha-box">

            <span className="captcha-text">
              {captcha}
            </span>

            <div>

              <button type="button" onClick={generateCaptcha}>
                ⟳
              </button>

              <button type="button" onClick={speakCaptcha}>
                🔊
              </button>

            </div>

          </div>

          <input
            type="text"
            placeholder="Enter Captcha"
            value={userCaptcha}
            onChange={(e) => setUserCaptcha(e.target.value)}
            required
          />

          <button className="login-btn" type="submit">
            LOGIN
          </button>

        </form>

      </div>

    </div>

  );

};

export default Login;