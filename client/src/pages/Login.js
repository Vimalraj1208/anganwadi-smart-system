import React, { useState, useEffect } from "react";
import "./Login.css";
import bgImage from "../assets/bg.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetype, setShowRetype] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");

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

  const handleLogin = (e) => {
    e.preventDefault();
    if (userCaptcha !== captcha) {
      alert("Captcha incorrect!");
      generateCaptcha();
      return;
    }
    alert("Login Success (Demo)");
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
            placeholder="Username / Student ID"
            required
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️‍🗨️" : "👁️"}
            </span>
          </div>

          <div className="password-wrapper">
            <input
              type={showRetype ? "text" : "password"}
              placeholder="Re-type Password"
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowRetype(!showRetype)}
            >
              {showRetype ? "👁️‍🗨️" : "👁️"}
            </span>
          </div>

          <div className="captcha-box">
            <span className="captcha-text">{captcha}</span>
            <div>
              <button type="button" onClick={generateCaptcha}>⟳</button>
              <button type="button" onClick={speakCaptcha}>🔊</button>
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