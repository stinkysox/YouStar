import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { GlobalContext } from "../../context/GlobalContext";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(GlobalContext);
  const isLogged = isAuthenticated();
  const navigate = useNavigate();

  // State to handle visibility of the confirmation modal
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <img
        className="navbar-logo"
        src="https://i.postimg.cc/QtQfgDvd/30-Best-Greek-Logo-Design-Ideas-You-Should-Check.jpg"
        alt="YoungStar Logo"
        onClick={() => navigate("/")}
      />
      <p>YoungStar</p>

      <div className="navbar-actions">
        <button onClick={() => navigate("/cart")} className="cart-button">
          <FaCartShopping />
        </button>
        {isLogged && (
          <button
            className="logout-button"
            onClick={() => setShowLogoutModal(true)}
          >
            <RiLogoutCircleRFill />
          </button>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="logout-modal">
          <div className="modal-content">
            <p>Are you sure you want to log out?</p>
            <div className="modal-actions">
              <button onClick={handleLogout}>Yes</button>
              <button onClick={() => setShowLogoutModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
