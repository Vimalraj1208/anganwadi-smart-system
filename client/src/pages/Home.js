import React from "react";
import classroom from "../assets/classroom.jpg";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-hero">
      <img src={classroom} alt="Anganwadi" />
    </div>
  );
};

export default Home;