import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios"; // Import axios for API calls
import { motion } from "framer-motion"; // Import motion from Framer Motion
import { DotLoader } from "react-spinners"; // Import DotLoader from react-spinners
import "./Products.css";

const Products = () => {
  const { category } = useParams();
  const { user, isAuthenticated } = useContext(GlobalContext); // Get user and authentication status
  const [cart, setCart] = useState([]); // Local cart state, can be synced with the backend later
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [error, setError] = useState(""); // Error state for handling any API errors

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/getallproducts"
        );
        setProducts(response.data.products);
        setLoading(false);
        console.log(products);
      } catch (error) {
        setError("Failed to fetch products"); // Handle any errors during the fetch
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  const handleAddToCart = async (product) => {
    const userId = user.userId;
    console.log(product);

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

  if (loading) {
    return (
      <div className="loader-container">
        <DotLoader color="#888" size={50} />
      </div>
    ); // Show DotLoader from react-spinners while fetching
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an issue with the API call
  }

  return (
    <div className="products-page">
      <Navbar />

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <motion.div
              key={product._id}
              className="product-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                  scale: 1.01,
                  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                }}
                whileTap={{
                  scale: 0.95,
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
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
