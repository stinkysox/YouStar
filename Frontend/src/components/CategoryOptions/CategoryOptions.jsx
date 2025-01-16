import React from "react";
import { Link } from "react-router-dom";
import "./CategoryOptions.css";

const CategoryOptions = () => {
  return (
    <>
      <ul className="category-options">
        <li>
          <Link to="/products/clothes">Clothing</Link>
        </li>
        <li>
          <Link to="/products/footwear">Shoes</Link>
        </li>
        <li>
          <Link to="/products/watches">Watches</Link>
        </li>
        <li>
          <Link to="/products/accessories">Accessories</Link>
        </li>
      </ul>

      <div className="home-model-container">
        <img
          src="https://i.postimg.cc/nLPx84LD/download-10.jpg"
          alt="Home Model"
        />
      </div>
    </>
  );
};

export default CategoryOptions;
