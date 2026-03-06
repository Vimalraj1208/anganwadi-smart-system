import React, { useState } from "react";
import "../styles/Attendance.css";

import AddStudentModal from "../components/AddStudentModal";
import FaceCamera from "../components/FaceCamera";
import QRScanner from "../components/QRScanner";
import AttendanceDashboard from "../components/AttendanceDashboard";

function Attendance() {

const [showAddStudent,setShowAddStudent] = useState(false)
const [activeFeature,setActiveFeature] = useState(null)

const openFeature = (feature)=>{
setActiveFeature(feature)
}

return (

<div className="attendance-page">

{/* Title */}
<h2 className="attendance-title">Attendance Management</h2>


{/* Feature Grid */}

<div className="feature-grid">

<div
className="feature-card"
onClick={()=>setShowAddStudent(true)}
>
<h3>➕ Add Student</h3>
<p>Register new child & generate QR</p>
</div>


<div
className="feature-card"
onClick={()=>openFeature("qr")}
>
<h3>📷 QR Attendance</h3>
<p>Scan student QR to mark present</p>
</div>


<div
className="feature-card"
onClick={()=>openFeature("face")}
>
<h3>😊 Check In / Out</h3>
<p>Face recognition attendance</p>
</div>


<div
className="feature-card"
onClick={()=>openFeature("dashboard")}
>
<h3>📊 Dashboard</h3>
<p>View attendance statistics</p>
</div>

</div>


{/* Feature Area */}

<div className="feature-display">

{activeFeature === "qr" && (
<div className="feature-box">
<h3>QR Attendance Scanner</h3>
<QRScanner/>
</div>
)}

{activeFeature === "face" && (
<div className="feature-box">
<h3>Face Recognition Camera</h3>
<FaceCamera/>
</div>
)}

{activeFeature === "dashboard" && (
<div className="feature-box">
<h3>Attendance Dashboard</h3>
<AttendanceDashboard/>
</div>
)}

</div>


{/* Add Student Modal */}

{showAddStudent && (
<AddStudentModal closeModal={()=>setShowAddStudent(false)} />
)}

</div>

)

}

export default Attendance;