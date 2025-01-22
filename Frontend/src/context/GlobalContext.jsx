import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const GlobalContext = createContext();

// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });
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
      return decoded?.exp && decoded.exp > Date.now() / 1000;
    } catch (e) {
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    setCart([]);
  };

  useEffect(() => {
    if (token && isAuthenticated()) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } else if (token) {
      logout(); // Token is invalid
    }
  }, [token]);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
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
