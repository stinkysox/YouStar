import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion"; // Import framer-motion
import "./CategoryOptions.css";

const images = [
  "https://i.postimg.cc/Njs24dSz/Nikolai-William-Alexander-Frederik.jpg",
  "https://i.postimg.cc/prr1zQxh/download-3.jpg",
  "https://i.postimg.cc/x8Xtc0yL/women-s-golden-watch.jpg",
  "https://i.postimg.cc/P5y33Fxp/liza-soberano.jpg",
  "https://i.postimg.cc/Hn04JV8c/1.jpg",
];

const CategoryOptions = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
  };

  const handleCategoryClick = (category) => {
    navigate(`/products/${category}`);
  };

  const animationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, ease: "easeIn" },
  };

  return (
    <>
      <ul className="category-options">
        <motion.li
          {...animationProps}
          onClick={() => handleCategoryClick("clothes")}
        >
          Clothing
        </motion.li>
        <motion.li
          {...animationProps}
          onClick={() => handleCategoryClick("footwear")}
        >
          Shoes
        </motion.li>
        <motion.li
          {...animationProps}
          onClick={() => handleCategoryClick("watches")}
        >
          Watches
        </motion.li>
        <motion.li
          {...animationProps}
          onClick={() => handleCategoryClick("accessories")}
        >
          Accessories
        </motion.li>
      </ul>

      <div className="home-model-container">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="slider-item">
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default CategoryOptions;
