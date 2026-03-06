import React from "react";

const AttendanceDashboard = () => {

  return (

    <div>

      <h2>Attendance Dashboard</h2>

      <div className="dashboard-cards">

        <div className="dash-card">
          Total Students : 52
        </div>

        <div className="dash-card">
          Present : 30
        </div>

        <div className="dash-card">
          Absent : 22
        </div>

      </div>

    </div>

  );

};

export default AttendanceDashboard;