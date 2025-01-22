import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner"; // Import dots loader
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading
  const { saveToken, setUser, isAuthenticated } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      const result = response.data;

      if (response.status === 200) {
        saveToken(result.token);
        setUser(result.user);
        navigate("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(
        "Login failed: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader
    try {
      const response = await axios.post("http://localhost:4000/createuser", {
        username,
        email,
        password,
      });
      const result = response.data;

      if (response.status === 201) {
        saveToken(result.token);
        setUser(result.user);
        navigate("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(
        "Signup failed: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="login-background-contianer">
      {loading && (
        <div className="loader-container">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="gray"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      )}
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

      <motion.div
        className="login-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="form-container">
          {!isLogin ? (
            <form className="signup-form" onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Username"
                className="input-field"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="input-field"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="submit-btn" type="submit">
                Sign Up
              </button>
              <p className="toggle-link" onClick={() => setIsLogin(true)}>
                Already have an account? Login
              </p>
            </form>
          ) : (
            <form className="login-form" onSubmit={handleLogin}>
              <input
                type="email"
                required
                placeholder="Email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                required
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="submit-btn" type="submit">
                Login
              </button>
              <p className="toggle-link" onClick={() => setIsLogin(false)}>
                Don&apos;t have an account? Sign Up
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
