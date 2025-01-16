import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="login-background-contianer">
      <nav className="navbar-login">
        <div className="navbar-content-login">
          <img
            src="https://i.postimg.cc/QtQfgDvd/30-Best-Greek-Logo-Design-Ideas-You-Should-Check.jpg"
            alt="Logo"
            className="navbar-logo-login"
          />
          <p className="navbar-title-login">YoungStar</p>
        </div>
      </nav>

      <div className="login-container">
        <div className="form-container">
          {!isLogin ? (
            <div className="signup-form">
              <input
                type="text"
                placeholder="Username"
                className="input-field"
              />
              <input type="email" placeholder="Email" className="input-field" />
              <input
                type="password"
                placeholder="Password"
                className="input-field"
              />
              <button className="submit-btn">Sign Up</button>
              <p className="toggle-link" onClick={() => setIsLogin(true)}>
                Already have an account? Login
              </p>
            </div>
          ) : (
            <div className="login-form">
              <input
                type="text"
                placeholder="Username"
                className="input-field"
              />
              <input
                type="password"
                placeholder="Password"
                className="input-field"
              />
              <button className="submit-btn">Login</button>
              <p className="toggle-link" onClick={() => setIsLogin(false)}>
                Dont have an account? Sign Up
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
