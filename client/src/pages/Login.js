import React, { useState, useEffect } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState("");

  // Generate random captcha
  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  // Generate on first load
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Voice captcha
  const speakCaptcha = () => {
    const msg = new SpeechSynthesisUtterance(captcha.split("").join(" "));
    window.speechSynthesis.speak(msg);
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (captchaInput !== captcha) {
      setError("Captcha Incorrect");
      generateCaptcha();
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful");
        console.log(data);
      } else {
        setError(data.message || "Login Failed");
      }
    } catch (err) {
      setError("Server not reachable");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Captcha Display */}
          <div className="captcha-box">
            <span className="captcha-text">{captcha}</span>

            <button
              type="button"
              onClick={generateCaptcha}
              className="small-btn"
            >
              🔄
            </button>

            <button
              type="button"
              onClick={speakCaptcha}
              className="small-btn"
            >
              🔊
            </button>
          </div>

          <input
            type="text"
            placeholder="Enter Captcha"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            required
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;