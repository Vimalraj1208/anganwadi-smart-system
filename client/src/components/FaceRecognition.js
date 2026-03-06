import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

const FaceRecognition = () => {

const videoRef = useRef();
let lastX = null;

useEffect(() => {

startCamera();
loadModels();

}, []);

const startCamera = () => {

navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => {

videoRef.current.srcObject = stream;

});

};

const loadModels = async () => {

await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

detectFace();

};

const detectFace = () => {

setInterval(async () => {

const detections = await faceapi.detectAllFaces(
videoRef.current,
new faceapi.TinyFaceDetectorOptions()
).withFaceLandmarks().withFaceDescriptors();

if(detections.length > 0){

const x = detections[0].detection.box.x;

if(lastX !== null){

if(x > lastX + 20){

console.log("➡️ CHECK IN");

}

if(x < lastX - 20){

console.log("⬅️ CHECK OUT");

}

}

lastX = x;

}

},1000);

};

return (

<div>

<h2>AI Face Attendance</h2>

<video
ref={videoRef}
autoPlay
muted
width="500"
/>

<p>

Left → Right = Check In  
<br/>
Right → Left = Check Out

</p>

</div>

);

};

export default FaceRecognition;