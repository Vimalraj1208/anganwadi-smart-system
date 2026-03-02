import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Attendance from "./pages/Attendance";
import TeacherRegister from "./pages/TeacherRegister";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;