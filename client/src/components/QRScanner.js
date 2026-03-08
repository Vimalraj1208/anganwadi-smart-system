import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

import successSound from "../assets/success.wav";

function QRScanner() {

useEffect(()=>{

const scanner = new Html5QrcodeScanner(
"reader",
{ fps:10, qrbox:250 },
false
);

scanner.render(async(result)=>{

console.log("Scanned:",result);

try{

await fetch("http://localhost:5000/api/attendance/mark",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
studentId:result
})
});

const audio = new Audio(successSound);
audio.play();

alert("Attendance Marked");

}catch(err){
console.log(err);
}

},(err)=>{});

},[]);

return(
<div>

<h3>QR Attendance Scanner</h3>

<div id="reader" style={{width:"300px"}}></div>

</div>
)

}

export default QRScanner