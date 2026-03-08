import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {

  const navigate = useNavigate();

  return (

    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Teacher Dashboard
      </h1>

      <div className="dashboard-cards">

        <div
          className="dashboard-card"
          onClick={() => navigate("/attendance")}
        >
          📍
          <h3>Attendance</h3>
          <p>Mark student attendance</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/growth")}
        >
          📈
          <h3>Growth Monitoring</h3>
          <p>Track child growth</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/report")}
        >
          🧠
          <h3>Report</h3>
          <p>View skill reports</p>
        </div>

      </div>

    </div>

  );

};

export default Dashboard;