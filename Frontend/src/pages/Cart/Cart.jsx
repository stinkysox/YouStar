import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import "./Cart.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import Footer from "../../components/Footer/Footer";
import { DotLoader } from "react-spinners";

const Cart = () => {
  const { user, setCart, cart } = useContext(GlobalContext); // Access user and cart from context
  const [error, setError] = useState(""); // State for error handling
  const [loading, setLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate();

  // Function to handle errors
  const handleError = (err) => {
    console.error(err);
    setError(err.response?.data?.message || "An unexpected error occurred");
    setLoading(false);
  };

  // Function to fetch cart items from the API
  const fetchCartItems = async () => {
    if (!user || !user.userId) {
      setError("User not logged in");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://youstar-d5y4.onrender.com/getitems",
        {
          userId: user.userId,
        }
      );

      setCart(response.data.cart || []); // Set cart from API response
      setError("");
      console.log(cart);
    } catch (err) {
      handleError(err); // Handle error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to remove an item from the cart
  const handleRemoveFromCart = async (productId) => {
    console.log("Hello");
    if (!user || !user.userId) {
      setError("User not logged in");
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://youstar-d5y4.onrender.com/removeitem",
        {
          userId: user.userId,
          productId, // Pass the product ID to the backend
        }
      );

      const updatedCart = response.data.cart || []; // Updated cart from backend

      setCart(updatedCart); // Update the cart in context
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage

      toast.success("Item Removed");
      setError(""); // Clear any previous errors
    } catch (err) {
      handleError(err); // Handle error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user, setCart]);

  // Calculate the total price
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
      <Navbar />
      <div className="cart-container">
        {loading ? (
          <div className="loader-container">
            <DotLoader color="#888" size={50} />
          </div>
        ) : cart.length === 0 ? (
          <div className="empty-container">
            <img
              src="https://i.postimg.cc/jd71nQ5y/Empty-Cart-Icon.jpg"
              alt="Empty Cart"
            />
            <p>Your cart is empty</p>
            <button onClick={() => navigate("/")}>Continue Shopping</button>
          </div>
        ) : (
          <div className="cart-items">
            {cart.map((item, index) => (
              <motion.div
                key={index}
                className="cart-item"
                whileHover={{
                  scale: 1.01, // Slightly scale up on hover
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Add a shadow
                }}
                initial={{ opacity: 0, y: 20 }} // Initial position and opacity
                animate={{ opacity: 1, y: 0 }} // Animate to visible
                transition={{ duration: 0.4 }} // Smooth transition
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>
                  <motion.button
                    whileHover={{
                      scale: 1.01, // Button scales slightly on hover
                    }}
                    className="remove-item-btn"
                    onClick={() => handleRemoveFromCart(item.productId)} // Call backend API to remove item
                  >
                    Remove Item
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="cart-footer">
            <h3>Total: ₹{calculateTotal()}</h3>
            <motion.button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </motion.button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
