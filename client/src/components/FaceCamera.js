import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

const FaceCamera = ({ markAttendance }) => {

const videoRef = useRef(null);

useEffect(() => {
startVideo();
loadModels();
}, []);

const startVideo = () => {
navigator.mediaDevices.getUserMedia({ video: true })
.then((stream) => {
if (videoRef.current) {
videoRef.current.srcObject = stream;
}
})
.catch((err) => console.log("Camera error:", err));
};

const loadModels = async () => {
await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
};

const detectFace = async () => {

const detection = await faceapi.detectSingleFace(
videoRef.current,
new faceapi.TinyFaceDetectorOptions()
);

if (detection) {
alert("Face Detected ✔");
markAttendance && markAttendance();
} else {
alert("Face Not Detected ❌");
}

};

return (

<div className="camera-container">

<h3>Face Check In / Check Out</h3>

<video
ref={videoRef}
autoPlay
playsInline
className="camera-video"
/>

<button className="detect-btn" onClick={detectFace}>
Detect Face
</button>

</div>

);

};

export default FaceCamera;