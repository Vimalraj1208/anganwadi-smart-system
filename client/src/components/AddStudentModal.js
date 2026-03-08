import React, { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

function AddStudentModal({ closeModal }) {

const videoRef = useRef(null);

const [modelsLoaded, setModelsLoaded] = useState(false);
const [descriptor, setDescriptor] = useState(null);
const [qr, setQr] = useState(null);
const [age, setAge] = useState("");
const [address, setAddress] = useState("");

const [form, setForm] = useState({
aadhaarNumber:"",
fullName:"",
fatherName:"",
motherName:"",
fatherNumber:"",
motherNumber:"",
gender:"",
dob:"",
email:"",
height:"",
weight:"",
username:"",
password:""
});


// =======================
// Load Models + Camera
// =======================

useEffect(()=>{

loadModels();
startCamera();
detectLocation();

},[])


const loadModels = async ()=>{

const MODEL_URL="/models"

await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
await faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL)
await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)

setModelsLoaded(true)

}


// =======================
// Camera Start
// =======================

const startCamera = async ()=>{

try{

const stream = await navigator.mediaDevices.getUserMedia({video:true})

if(videoRef.current){
videoRef.current.srcObject = stream
}

}catch(err){

console.log("Camera error:",err)

}

}


// =======================
// Address Auto Detect
// =======================

const detectLocation = ()=>{

if(!navigator.geolocation) return

navigator.geolocation.getCurrentPosition(async(pos)=>{

const lat = pos.coords.latitude
const lon = pos.coords.longitude

try{

const res = await fetch(
`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
)

const data = await res.json()

setAddress(
data.address.village ||
data.address.town ||
data.address.city ||
data.address.state ||
""
)

}catch(err){

console.log(err)

}

})

}


// =======================
// Face Capture
// =======================

const captureFace = async ()=>{

if(!modelsLoaded){
alert("Models still loading")
return
}

if(!videoRef.current || videoRef.current.readyState !== 4){
alert("Camera not ready")
return
}

const detection = await faceapi
.detectSingleFace(
videoRef.current,
new faceapi.TinyFaceDetectorOptions()
)
.withFaceLandmarks()
.withFaceDescriptor()

if(!detection){

alert("Face not detected ❌")
return

}

setDescriptor(Array.from(detection.descriptor))

alert("Face captured successfully ✅")

}


// =======================
// Form Change
// =======================

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value})
}


// =======================
// DOB → Age Calculate
// =======================

const handleDobChange=(e)=>{

const dob = new Date(e.target.value)
const today = new Date()

let ageCalc = today.getFullYear()-dob.getFullYear()

const m = today.getMonth()-dob.getMonth()

if(m<0 || (m===0 && today.getDate()<dob.getDate())){
ageCalc--
}

setAge(ageCalc)

setForm({...form,dob:e.target.value})

}


// =======================
// DOB Restriction
// =======================

const today = new Date()

const minDate = new Date(
today.getFullYear()-6,
today.getMonth(),
today.getDate()
).toISOString().split("T")[0]

const maxDate = new Date(
today.getFullYear()-1,
today.getMonth(),
today.getDate()
).toISOString().split("T")[0]


// =======================
// Submit Student
// =======================

const handleSubmit = async(e)=>{

e.preventDefault()

if(!descriptor){
alert("Capture face first")
return
}

try{

const res = await fetch(
"http://localhost:5000/api/students/register",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
...form,
age,
address,
faceDescriptor:descriptor
})
}
)

const data = await res.json()

if(res.ok){

alert("Student Registered Successfully")

if(data.student && data.student.qrCode){
setQr(data.student.qrCode)
}

}else{

alert(data.message || "Registration Failed")

}

}catch(err){

console.log(err)
alert("Server Error")

}

}


// =======================
// UI
// =======================

return(

<div className="modal-overlay">

<div className="modal-box">

<h2>Add Student</h2>

<form onSubmit={handleSubmit}>

<input
name="aadhaarNumber"
placeholder="Aadhaar Number"
onChange={handleChange}
required
/>

<input
name="fullName"
placeholder="Name"
onChange={handleChange}
required
/>

<input
name="fatherName"
placeholder="Father Name"
onChange={handleChange}
/>

<input
name="motherName"
placeholder="Mother Name"
onChange={handleChange}
/>

<input
name="fatherNumber"
placeholder="Father Phone"
onChange={handleChange}
/>

<input
name="motherNumber"
placeholder="Mother Phone"
onChange={handleChange}
/>

<input
name="gender"
placeholder="Gender"
onChange={handleChange}
/>


<input
type="date"
name="dob"
min={minDate}
max={maxDate}
onChange={handleDobChange}
/>


<input
placeholder="Age"
value={age}
readOnly
/>


<input
placeholder="Address"
value={address}
readOnly
/>


<input
name="email"
placeholder="Email"
onChange={handleChange}
/>

<input
name="height"
placeholder="Height"
onChange={handleChange}
/>

<input
name="weight"
placeholder="Weight"
onChange={handleChange}
/>

<input
name="username"
placeholder="Student ID / Username"
onChange={handleChange}
required
/>

<input
name="password"
type="password"
placeholder="Password"
onChange={handleChange}
required
/>


<h3>Capture Face</h3>

<video
ref={videoRef}
autoPlay
style={{
width:"100%",
maxWidth:"250px",
borderRadius:"10px"
}}
/>

<br/>

<button
type="button"
onClick={captureFace}
disabled={!modelsLoaded}
>
Capture Face
</button>


<div style={{marginTop:"10px"}}>

<button type="submit">Register</button>

<button
type="button"
onClick={closeModal}
style={{marginLeft:"10px"}}
>
Close
</button>

</div>

</form>


{qr &&(

<div style={{marginTop:"20px",textAlign:"center"}}>

<h3>Student QR Code</h3>

<img src={qr} alt="QR Code" width="200"/>

</div>

)}

</div>

</div>

)

}

export default AddStudentModal