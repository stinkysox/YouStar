import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import CategoryOptions from "../../components/CategoryOptions/CategoryOptions";
import Footer from "../../components/Footer/Footer";
const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <CategoryOptions />
      <Footer />
    </div>
  );
};

export default Home;
