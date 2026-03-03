import React, { useState, useEffect } from "react";
import "./Home.css";
import bgImage from "../assets/bg.jpg";

const words = [
  "Attendance System",
  "Growth Monitoring",
  "Skill Intelligence",
  "AI Prediction"
];

const Home = () => {
  const fullText = "Smart AI-Based Anganwadi Monitoring System";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Typing Effect
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[index]);
        setIndex(index + 1);
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  // Sliding Words
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(prev => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="hero-overlay">
          <h1 className="typing-text">{displayText}</h1>
          <h2 className="sliding-text">{words[wordIndex]}</h2>

          <button className="explore-btn">Explore Now</button>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="about-section">
        <div className="about-left">
          <h2>About AnganCare</h2>
          <p>
            AnganCare is an AI-powered smart monitoring system designed to
            modernize Anganwadi centers through intelligent attendance tracking,
            growth monitoring, and skill assessment.
          </p>
          <p>
            Using predictive analytics and machine learning, the system helps
            teachers identify attendance trends, monitor child development,
            and generate real-time insights.
          </p>
        </div>

        <div className="about-right">
          <div className="about-card">📍 Smart Attendance Tracking</div>
          <div className="about-card">📈 Predictive Growth Analytics</div>
          <div className="about-card">🧠 Skill Intelligence Engine</div>
        </div>
      </div>

     
      {/* VISION & MISSION */}
      <div className="vision-section">
        <div className="vision-card">
          <h3>🎯 Our Vision</h3>
          <p>
            To digitally transform Anganwadi centers using AI-driven monitoring
            and data intelligence.
          </p>
        </div>

        <div className="vision-card">
          <h3>🚀 Our Mission</h3>
          <p>
            To empower teachers and administrators with smart tools that enhance
            child development and operational efficiency.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Home;