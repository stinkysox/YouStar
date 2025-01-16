import React from "react";
import "./Navbar.css";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="navbar">
      <img
        className="navbar-logo"
        src="https://i.postimg.cc/QtQfgDvd/30-Best-Greek-Logo-Design-Ideas-You-Should-Check.jpg"
        alt=""
      />
      <p>YoungStar</p>

      <div>
        <button>
          <FaCartShopping />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
