import React, { useEffect, useState } from "react";
import "../css/HomePage.css";
import bus from "../assets/bus.png";
import SearchPage from "./SearchPage";
import c1 from "../assets/c1.jpg";
import c2 from "../assets/c2.jpg";
import c3 from "../assets/c3.png";
import c4 from "../assets/c4.png";

// Images for the slider
const images = [c1, c2, c3, c4];

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  useEffect(() => {
    localStorage.removeItem("bookedSeats");
  }, []);

  return (
    <>
      <div className="container">
        <div className="left-container">
          <p className="smart-up">It's not a Bus</p>
          <p className="smart">It's a Smart Bus</p>
        </div>
        <div className="right-container">
          <img src={bus} alt="bus" className="busimg" />
        </div>
      </div>

      <SearchPage />
      <div className="slider-container">
        <button className="slider-button prev" onClick={prevImage}>
          &lt;
        </button>

        <div className="slider-image-container">
          <div
            className="slider-images"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`slider-img-${index}`}
                className="slider-image"
              />
            ))}
          </div>
        </div>

        <button className="slider-button next" onClick={nextImage}>
          &gt;
        </button>
      </div>
    </>
  );
};

export default HomePage;
