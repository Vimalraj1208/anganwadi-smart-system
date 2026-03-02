import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
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

      <div className="auth-buttons">
        <Link to="/teacher-register" className="get-started">
          Get Started
        </Link>

        <Link to="/login" className="login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;