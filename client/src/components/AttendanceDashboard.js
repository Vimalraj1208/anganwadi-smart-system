import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const AttendanceDashboard = () => {

const [stats,setStats] = useState({
total:0,
present:0,
absent:0
});

useEffect(()=>{

fetch("http://localhost:5000/api/attendance/today")
.then(res=>res.json())
.then(data=>setStats(data));

socket.on("attendanceUpdated",(data)=>{
setStats(data);
});

},[]);

return(

<div>

<h2>Attendance Dashboard</h2>

<div className="dashboard-cards">

<div className="dash-card">
Total Students : {stats.total}
</div>

<div className="dash-card">
Present : {stats.present}
</div>

<div className="dash-card">
Absent : {stats.absent}
</div>

</div>

</div>

);

};

export default AttendanceDashboard;