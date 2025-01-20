import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <img
        className="navbar-logo"
        src="https://i.postimg.cc/QtQfgDvd/30-Best-Greek-Logo-Design-Ideas-You-Should-Check.jpg"
        alt=""
        onClick={() => navigate("/")}
      />
      <p>YoungStar</p>

      <div>
        <button onClick={() => navigate("/cart")}>
          <FaCartShopping />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
