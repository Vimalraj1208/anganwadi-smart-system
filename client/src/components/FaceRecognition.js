import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

const FaceRecognition = () => {

const videoRef = useRef(null);

useEffect(()=>{
startCamera();
loadModels();
},[]);

const startCamera = async () => {

const stream = await navigator.mediaDevices.getUserMedia({ video:true });

videoRef.current.srcObject = stream;

};

const loadModels = async () => {

const MODEL_URL="/models";

await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
await faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL);
await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);

startDetection();

};

const startDetection = () => {

setInterval(async () => {

if (!videoRef.current || videoRef.current.readyState !== 4) return;

const detections = await faceapi
.detectAllFaces(
videoRef.current,
new faceapi.TinyFaceDetectorOptions()
)
.withFaceLandmarks()
.withFaceDescriptors();

if(detections.length === 0){
console.log("No face detected");
return;
}

const descriptor = detections[0].descriptor;

matchStudent(descriptor);

},2000);

};

const matchStudent = async (descriptor) => {

const faces = JSON.parse(localStorage.getItem("faces")) || [];

for(let face of faces){

const stored = new Float32Array(face.descriptor);

const distance = faceapi.euclideanDistance(descriptor,stored);

if(distance < 0.5){

console.log("Student Detected:",face.studentId);

markAttendance(face.studentId);

return;

}

}

};

const markAttendance = async (studentId) => {

await fetch("http://localhost:5000/api/face/check",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
studentId
})

});

};

return(

<div>

<h2>Face Check In / Check Out</h2>

<video ref={videoRef} autoPlay muted width="500"/>

<p>Automatic Face Scan Running...</p>

</div>

);

};

export default FaceRecognition;