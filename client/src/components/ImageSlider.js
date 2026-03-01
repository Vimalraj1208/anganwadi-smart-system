import React from "react";
import "./ImageSlider.css";

function ImageSlider() {
  const images = [
    "/assets/img1.jpg",
    "/assets/img2.jpg",
    "/assets/img3.jpg",
    "/assets/img4.jpg",
    "/assets/img5.jpg"
  ];

  return (
    <div className="hero-slider">
      <div className="slide-track">
        {images.concat(images).map((img, index) => (
          <div
            key={index}
            className="slide"
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;