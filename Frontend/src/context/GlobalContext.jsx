/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";

// Create the Context
export const GlobalContext = createContext();

// Create the Provider Component
export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

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
      value={{ cart, addToCart, removeFromCart, user, setUser }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
