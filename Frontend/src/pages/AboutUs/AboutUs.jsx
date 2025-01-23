import React, { useState, useEffect } from "react";
import "./AboutUs.css";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
const AboutUs = () => {
  const navigate = useNavigate("/");
  const slideImages = [
    "https://i.postimg.cc/wBnB52fD/download-22.jpg",
    "https://i.postimg.cc/6QYDkTL5/download-21.jpg",
    "https://i.postimg.cc/FzNNGBjk/download-23.jpg",
    "https://i.postimg.cc/QdGGqPh8/download-24.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [slideImages.length]);

  return (
    <div className="about-us-bg-container">
      <div className="about-nav">
        <img
          src="https://i.postimg.cc/QtQfgDvd/30-Best-Greek-Logo-Design-Ideas-You-Should-Check.jpg"
          alt=""
          className="about-nav-image"
          onClick={() => navigate("/")}
        />
        <h3>YoungStar</h3>
      </div>
      <div className="about-text-image-container">
        <div className="about-text-container">
          <p>
            Welcome to YoungStar, your go-to startup clothing brand redefining
            fashion trends. At YoungStar, we aim to bring the latest, most
            stylish, and affordable clothing to your wardrobe. As a brand, our
            mission is simple: to deliver fast trends and timeless styles that
            resonate with the modern consumer while ensuring the highest quality
            and comfort.
          </p>
        </div>
        <div className="about-image-container">
          <img
            src={slideImages[currentImageIndex]}
            alt={`About Us Slide ${currentImageIndex + 1}`}
            className="about-us-image"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
