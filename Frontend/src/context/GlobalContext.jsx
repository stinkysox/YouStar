/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
export const GlobalContext = createContext();

// Create the Provider Component
export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null); // Initialize from localStorage

  // Save token in both state and localStorage
  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  // Check if the token is valid (not expired)
  const isAuthenticated = () => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp > Date.now() / 1000; // Check if token is expired
    } catch (e) {
      return false; // If decoding fails, token is invalid
    }
  };

  // Logout function to clear token and user data
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  // Set the user if the token is valid
  useEffect(() => {
    if (isAuthenticated()) {
      const decoded = jwtDecode(token); // Decode the token to get user details
      setUser(decoded); // Set the user from token
    } else {
      logout(); // If the token is invalid, logout the user
    }
  }, [token]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <GlobalContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        user,
        setUser,
        token,
        saveToken, // Pass function to save token
        logout, // Pass function to logout
        isAuthenticated, // Pass function to check if authenticated
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
