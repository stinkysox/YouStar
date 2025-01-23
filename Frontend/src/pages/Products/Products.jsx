import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import { motion } from "framer-motion";
import { DotLoader } from "react-spinners";
import "./Products.css";

const Products = () => {
  const { category } = useParams();
  const { user, isAuthenticated, setCart } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://youstar-d5y4.onrender.com/getallproducts"
        );
        setProducts(response.data.products);
        setLoading(false);
        console.log(products);
      } catch (error) {
        setError("Failed to fetch products");
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
      const response = await axios.post(
        "https://youstar-d5y4.onrender.com/addtocart",
        {
          userId: userId,
          product: product,
        }
      );
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
    );
  }

  if (error) {
    return <div>{error}</div>;
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
              transition={{ duration: 0.5 }}
              whileHover={{
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                transition: { duration: 0.3 },
              }}
              whileTap={{
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.2 },
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
