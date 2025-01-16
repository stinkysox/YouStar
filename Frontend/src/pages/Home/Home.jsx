import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import CategoryOptions from "../../components/CategoryOptions/CategoryOptions";
const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <CategoryOptions />
    </div>
  );
};

export default Home;
