import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";

const FaceTrainer = ({ studentName }) => {

const videoRef = useRef();
const [captured, setCaptured] = useState(false);

useEffect(() => {

loadModels();

}, []);

const loadModels = async () => {

const MODEL_URL = "/models";

await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
await faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL);
await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);

startCamera();

};

const startCamera = async () => {

const stream = await navigator.mediaDevices.getUserMedia({ video: true });

videoRef.current.srcObject = stream;

};

const captureFace = async () => {

const detection = await faceapi
.detectSingleFace(videoRef.current,new faceapi.TinyFaceDetectorOptions())
.withFaceLandmarks(true)
.withFaceDescriptor();

if(!detection){

alert("Face not detected");

return;

}

const descriptor = Array.from(detection.descriptor);

localStorage.setItem(studentName, JSON.stringify(descriptor));

setCaptured(true);

};

return (

<div>

<h3>Train Face for {studentName}</h3>

<video
ref={videoRef}
autoPlay
width="320"
/>

<br/>

<button onClick={captureFace}>
Capture Face
</button>

{captured && <p>Face Saved ✅</p>}

</div>

);

};

export default FaceTrainer;