import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/protectedRoute";
import Cart from "./pages/Cart/Cart";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home /> {/* Home is protected */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:category"
          element={
            <ProtectedRoute>
              <Products /> {/* Products is protected */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart /> {/* Products is protected */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
