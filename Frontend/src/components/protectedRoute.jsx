/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(GlobalContext); // Access authentication status from context

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children; // If user is authenticated, render the child components
};

export default ProtectedRoute;
