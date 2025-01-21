import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Login from "./pages/Login/Login";
import Checkout from "./pages/CheckOut/CheckOut";
import ProtectedRoute from "./components/protectedRoute";
import Cart from "./pages/Cart/Cart";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
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
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
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
              <Cart /> {/* Cart is protected */}
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Add ToastContainer here */}
      <ToastContainer />
    </Router>
  );
};

export default App;
