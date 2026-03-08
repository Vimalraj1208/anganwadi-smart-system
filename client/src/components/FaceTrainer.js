import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

const FaceTrainer = ({ studentId }) => {

const videoRef = useRef(null);
const [saved,setSaved] = useState(false);

useEffect(()=>{
loadModels();
},[]);

const loadModels = async () => {

const MODEL_URL="/models";

await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
await faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL);
await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);

startCamera();

};

const startCamera = async () => {

const stream = await navigator.mediaDevices.getUserMedia({ video:true });
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

const faces = JSON.parse(localStorage.getItem("faces")) || [];

faces.push({
studentId,
descriptor
});

localStorage.setItem("faces",JSON.stringify(faces));

setSaved(true);

};

return(

<div>

<h3>Train Face</h3>

<video ref={videoRef} autoPlay width="300"/>

<br/>

<button onClick={captureFace}>Capture Face</button>

{saved && <p>Face Saved ✅</p>}

</div>

);

};

export default FaceTrainer;