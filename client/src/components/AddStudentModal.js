import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "../styles/AddStudentModal.css";

const AddStudentModal = ({ closeModal, addStudent }) => {

  const [student, setStudent] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    fatherPhone: "",
    motherPhone: "",
    gender: "",
    dob: "",
    age: "",
    email: "",
    address: "",
    height: "",
    weight: "",
    username: "",
    password: ""
  });

  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    if (student.dob) {
      const birthYear = new Date(student.dob).getFullYear();
      const age = new Date().getFullYear() - birthYear;
      setStudent(prev => ({ ...prev, age }));
    }
  }, [student.dob]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setStudent(prev => ({
        ...prev,
        address: `Lat:${position.coords.latitude}, Lng:${position.coords.longitude}`
      }));
    });
  }, []);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {

    const id = "STU" + Date.now();

    const newStudent = {
      ...student,
      id
    };

    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(newStudent);
    localStorage.setItem("students", JSON.stringify(students));

    setQrValue(id);

    addStudent(newStudent);
  };

  return (
    <div className="modal">

      <div className="modal-content">

        <h2>Add Student</h2>

        <input name="name" placeholder="Name" onChange={handleChange}/>
        <input name="fatherName" placeholder="Father Name" onChange={handleChange}/>
        <input name="motherName" placeholder="Mother Name" onChange={handleChange}/>
        <input name="fatherPhone" placeholder="Father Phone" onChange={handleChange}/>
        <input name="motherPhone" placeholder="Mother Phone" onChange={handleChange}/>
        <input name="gender" placeholder="Gender" onChange={handleChange}/>
        <input type="date" name="dob" onChange={handleChange}/>
        <input value={student.age} placeholder="Age"/>
        <input name="email" placeholder="Email" onChange={handleChange}/>
        <input value={student.address} placeholder="Address"/>
        <input name="height" placeholder="Height" onChange={handleChange}/>
        <input name="weight" placeholder="Weight" onChange={handleChange}/>
        <input name="username" placeholder="Username" onChange={handleChange}/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange}/>

        <button onClick={handleSubmit}>Register</button>
        <button onClick={closeModal}>Close</button>

 {qrValue && (
  <div>
    <h4>Student QR Code</h4>
    <QRCodeCanvas value={qrValue} size={200}/>
  </div>
)}

      </div>

    </div>
  );
};

export default AddStudentModal;