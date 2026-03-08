import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("username");

    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUser);
    }

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setIsLoggedIn(false);

    navigate("/login");

    window.location.reload();

  };

  return (

    <div className="navbar">

      <div className="logo">ANGANCARE</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/attendance">Attendance</Link>
        <Link to="/growth">Growth</Link>
        <Link to="/report">Report</Link>
        <Link to="/notification">Notification</Link>
        <Link to="/setting">Setting</Link>
      </div>

      {!isLoggedIn ? (

        <div className="auth-buttons">

          <Link to="/teacher-register" className="get-started">
            Get Started
          </Link>

          <Link to="/login" className="login">
            Login
          </Link>

        </div>

      ) : (

        <div className="user-section">

          <span className="welcome-text">
            Welcome {username}
          </span>

          <button className="logout-btn" onClick={handleLogout}>
            🔓 Logout
          </button>

        </div>

      )}

    </div>

  );

};

export default Navbar;