import React from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">
        <button className="footer-link" onClick={() => navigate("/about-us")}>
          About
        </button>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <FaInstagram className="icon" />
        </a>

        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <FaFacebookF className="icon" />
        </a>
        <button className="footer-link" onClick={() => navigate("/contact")}>
          Contact
        </button>
      </div>
    </footer>
  );
};

export default Footer;
