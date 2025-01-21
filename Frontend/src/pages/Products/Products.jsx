import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { productsListArray } from "../../assets/ProductsList";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios"; // Import axios for API calls
import { motion } from "framer-motion"; // Import motion from Framer Motion
import "./Products.css";

const Products = () => {
  const { category } = useParams();
  const { user, isAuthenticated } = useContext(GlobalContext); // Get user and authentication status
  const [cart, setCart] = useState([]); // Local cart state, can be synced with the backend later

  const filteredProducts = productsListArray.filter(
    (product) => product.category === category
  );

  const handleAddToCart = async (product) => {
    const userId = user.userId;
    const isValidUser = isAuthenticated();

    try {
      const response = await axios.post("http://localhost:4000/addtocart", {
        userId: userId,
        product: product,
      });
      setCart(response.data.cart);
      console.log("Updated Cart:", response.data.cart);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="products-page">
      <Navbar />

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="product-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }} // Animate to full opacity and original position
              transition={{ duration: 0.5 }} // Smooth transition
              whileHover={{
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", // Add shadow on hover
                transition: { duration: 0.3 }, // Smooth transition for shadow effect
              }}
              whileTap={{
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.15)", // Smaller shadow on tap
                transition: { duration: 0.2 }, // Smooth transition for shadow effect
              }}
            >
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>Price: ₹{product.price}</p>
              <motion.button
                whileHover={{
                  scale: 1.01, // Slightly scale up when hovered
                  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)", // Add shadow when hovered
                }}
                whileTap={{
                  scale: 0.95, // Scale down when tapped
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow when tapped
                }}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </motion.button>
            </motion.div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
