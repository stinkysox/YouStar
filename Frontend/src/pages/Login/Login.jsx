import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { saveToken, setUser, isAuthenticated } = useContext(GlobalContext); // Get context methods
  const navigate = useNavigate();

  // Redirect if the user is already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/"); // Redirect to home if user is logged in
    }
  }, [navigate, isAuthenticated]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });

      const result = response.data;

      if (response.status === 200) {
        saveToken(result.token); // Save the token in context
        setUser(result.user); // Optionally save user info in context
        navigate("/"); // Navigate to home page after successful login
      } else {
        alert(result.message); // Show error message if login fails
      }
    } catch (error) {
      alert("Login failed: " + error.response?.data?.message || error.message);
    }
  };

  // Handle user signup
  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:4000/createuser", {
        username,
        email,
        password,
      });

      const result = response.data;

      if (response.status === 201) {
        saveToken(result.token); // Save the token in context
        setUser(result.user); // Optionally save user info in context
        navigate("/"); // Navigate to home page after successful signup
      } else {
        alert(result.message); // Show error message if signup fails
      }
    } catch (error) {
      alert("Signup failed: " + error.response?.data?.message || error.message);
    }
  };

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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="submit-btn" onClick={handleSignup}>
                Sign Up
              </button>
              <p className="toggle-link" onClick={() => setIsLogin(true)}>
                Already have an account? Login
              </p>
            </div>
          ) : (
            <div className="login-form">
              <input
                type="email"
                placeholder="Email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="submit-btn" onClick={handleLogin}>
                Login
              </button>
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
