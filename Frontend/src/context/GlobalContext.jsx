import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const GlobalContext = createContext();

// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const isAuthenticated = () => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp > Date.now() / 1000;
    } catch (e) {
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    if (isAuthenticated()) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } else {
      logout();
    }
  }, [token]);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <GlobalContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        user,
        setUser,
        token,
        saveToken,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
