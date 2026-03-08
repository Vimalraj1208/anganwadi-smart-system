import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function StudentsList() {

const [students,setStudents] = useState([]);
const [selectedStudent,setSelectedStudent] = useState(null);

useEffect(()=>{
fetchStudents();
},[]);

const fetchStudents = async () => {

try{

const res = await fetch("http://localhost:5000/api/students/all");

const data = await res.json();

console.log("students:",data);

setStudents(Array.isArray(data) ? data : []);

}catch(error){

console.log("Error fetching students",error);

}

};

return(

<div style={{marginTop:"30px"}}>

<h3>Registered Students</h3>

<table style={{width:"100%",borderCollapse:"collapse"}}>

<thead>

<tr style={{background:"#f4f6f8"}}>

<th style={{border:"1px solid #ddd",padding:"10px"}}>Name</th>
<th style={{border:"1px solid #ddd",padding:"10px"}}>Student ID</th>
<th style={{border:"1px solid #ddd",padding:"10px"}}>Father</th>
<th style={{border:"1px solid #ddd",padding:"10px"}}>Mother</th>

</tr>

</thead>

<tbody>

{students.map((student)=>(
<tr
key={student._id}
onClick={()=>setSelectedStudent(student)}
style={{cursor:"pointer"}}
>

<td style={{border:"1px solid #ddd",padding:"10px"}}>
{student.fullName}
</td>

<td style={{border:"1px solid #ddd",padding:"10px"}}>
{student.studentId}
</td>

<td style={{border:"1px solid #ddd",padding:"10px"}}>
{student.fatherName}
</td>

<td style={{border:"1px solid #ddd",padding:"10px"}}>
{student.motherName}
</td>

</tr>
))}

</tbody>

</table>

{/* QR CODE */}

{selectedStudent && (

<div style={{marginTop:"30px",textAlign:"center"}}>

<h3>Student QR Code</h3>

<QRCodeCanvas
value={selectedStudent.studentId}
size={200}
/>

<p style={{marginTop:"10px"}}>
{selectedStudent.fullName}
</p>

</div>

)}

</div>

);

}

export default StudentsList;