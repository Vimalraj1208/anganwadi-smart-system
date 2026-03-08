import React, { useState } from "react";
import "../styles/Attendance.css";

import AddStudentModal from "../components/AddStudentModal";
import FaceCamera from "../components/FaceCamera";
import QRScanner from "../components/QRScanner";
import AttendanceDashboard from "../components/AttendanceDashboard";
import StudentsList from "../components/StudentsList";

function Attendance() {

  const [showAddStudent, setShowAddStudent] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  const openFeature = (feature) => {
    setActiveFeature(feature);
  };

  return (

    <div className="attendance-page">

      {/* Title */}
      <h2 className="attendance-title">Attendance Management</h2>


      {/* Feature Cards */}

      <div className="feature-grid">

        {/* Add Student */}
        <div
          className="feature-card"
          onClick={() => setShowAddStudent(true)}
        >
          <h3>➕ Add Student</h3>
          <p>Register new child & generate QR</p>
        </div>


        {/* QR Attendance */}
        <div
          className="feature-card"
          onClick={() => openFeature("qr")}
        >
          <h3>📷 QR Attendance</h3>
          <p>Scan student QR to mark present</p>
        </div>


        {/* Face Recognition */}
        <div
          className="feature-card"
          onClick={() => openFeature("face")}
        >
          <h3>😊 Check In / Out</h3>
          <p>Face recognition attendance</p>
        </div>


        {/* Dashboard */}
        <div
          className="feature-card"
          onClick={() => openFeature("dashboard")}
        >
          <h3>📊 Dashboard</h3>
          <p>View attendance statistics</p>
        </div>


        {/* Students List */}
        <div
          className="feature-card"
          onClick={() => openFeature("students")}
        >
          <h3>👶 Students List</h3>
          <p>View registered children</p>
        </div>

      </div>


      {/* Feature Display */}

      <div className="feature-display">

        {activeFeature === "qr" && (
          <div className="feature-box">
            <h3>QR Attendance Scanner</h3>
            <QRScanner />
          </div>
        )}

        {activeFeature === "face" && (
          <div className="feature-box">
            <h3>Face Recognition Camera</h3>
            <FaceCamera />
          </div>
        )}

        {activeFeature === "dashboard" && (
          <div className="feature-box">
            <AttendanceDashboard />
          </div>
        )}

        {activeFeature === "students" && (
          <div className="feature-box">
            <StudentsList />
          </div>
        )}

      </div>


      {/* Add Student Modal */}

      {showAddStudent && (
        <AddStudentModal closeModal={() => setShowAddStudent(false)} />
      )}

    </div>

  );
}

export default Attendance;