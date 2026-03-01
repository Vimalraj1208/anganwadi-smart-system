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
  <Link to="/register">
    <button className="get-started">Get Started</button>
  </Link>

  <Link to="/login">
    <button className="login">Login</button>
  </Link>
</div>
    </div>
  );
};

export default Navbar;