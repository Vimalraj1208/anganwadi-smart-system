import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./Attendance.css";

const Attendance = () => {
  const [studentData, setStudentData] = useState({
    aadhaar: "",
    name: "",
    username: "",
    password: "",
    location: ""
  });

  const [showScanner, setShowScanner] = useState(false);
  const [scannerInstance, setScannerInstance] = useState(null);
  const [message, setMessage] = useState("");

  /* ---------------- LOCATION ---------------- */

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStudentData((prev) => ({
            ...prev,
            location: `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`
          }));
        },
        () => alert("Location permission denied")
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  /* ---------------- QR SCANNER ---------------- */

  useEffect(() => {
    let scanner;

    if (showScanner) {
      scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250 },
        false
      );

      setScannerInstance(scanner);

      scanner.render(
        (decodedText) => {
          setStudentData((prev) => ({
            ...prev,
            aadhaar: decodedText
          }));

          // Auto stop after 5 seconds
          setTimeout(() => {
            scanner.clear();
            setShowScanner(false);
          }, 5000);
        },
        (error) => {
          console.warn(error);
        }
      );
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(() => {});
      }
    };
  }, [showScanner]);

  /* ---------------- INPUT CHANGE ---------------- */

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value
    });
  };

  /* ---------------- DUMMY FETCH ---------------- */

  const fetchStudent = () => {
    if (studentData.aadhaar.length !== 12) {
      alert("Enter valid 12-digit Aadhaar");
      return;
    }

    // Temporary dummy data (replace with backend later)
    setStudentData((prev) => ({
      ...prev,
      name: "Demo Student"
    }));
  };

  /* ---------------- MARK ATTENDANCE ---------------- */

  const markAttendance = (e) => {
    e.preventDefault();

    if (!studentData.username || !studentData.password) {
      setMessage("Enter Username & Password");
      return;
    }

    setMessage("Attendance Marked Successfully ✅");

    setStudentData((prev) => ({
      ...prev,
      aadhaar: "",
      name: "",
      username: "",
      password: ""
    }));
  };

  /* ---------------- MANUAL STOP ---------------- */

  const stopScanner = () => {
    if (scannerInstance) {
      scannerInstance.clear();
    }
    setShowScanner(false);
  };

  return (
    <div className="attendance-container">
      <div className="attendance-card">
        <h2>Student Attendance</h2>

        <form onSubmit={markAttendance}>

          {/* Scan Button */}
          <button
            type="button"
            onClick={() => setShowScanner(true)}
          >
            Scan Aadhaar / QR
          </button>

          {/* Scanner View */}
          {showScanner && (
            <>
              <div id="reader" style={{ marginTop: "20px" }}></div>

              <button
                type="button"
                style={{
                  marginTop: "10px",
                  background: "red",
                  color: "white"
                }}
                onClick={stopScanner}
              >
                Stop Scanner
              </button>
            </>
          )}

          {/* Aadhaar */}
          <input
            type="text"
            name="aadhaar"
            placeholder="Aadhaar Number"
            value={studentData.aadhaar}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            onClick={fetchStudent}
          >
            Fetch Student
          </button>

          {/* Student Name */}
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={studentData.name}
            readOnly
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Current Location"
            value={studentData.location}
            readOnly
          />

          <button
            type="button"
            onClick={getLocation}
          >
            Get Current Location
          </button>

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Student Username"
            value={studentData.username}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Student Password"
            value={studentData.password}
            onChange={handleChange}
            required
          />

          {/* Submit */}
          <button type="submit">
            Mark Attendance
          </button>

        </form>

        {message && (
          <p style={{ color: "green", marginTop: "15px" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Attendance;