import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import "./Cart.css";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, user } = useContext(GlobalContext); // Access cart, removeFromCart, and user from context
  const [cartItems, setCartItems] = useState([]); // Local state to store cart items from the API
  const [error, setError] = useState(""); // State for error handling
  const [loading, setLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate();

  // Function to fetch cart items from the API
  const fetchCartItems = async () => {
    if (!user || !user.userId) {
      setError("User not logged in");
      return;
    }

    setLoading(true); // Start loading
    try {
      // Sending userId as part of the request body in POST request
      const response = await axios.post("http://localhost:4000/getitems", {
        userId: user.userId,
      });
      setCartItems(response.data.cart || []); // Set cart items from the API to the state
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setError(err.response?.data?.message || "Failed to fetch cart items");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch cart items when the component mounts or cart changes
  useEffect(() => {
    fetchCartItems();
  }, [cart, user]); // Dependency array: fetch cart items when `cart` or `user` changes

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
      <Navbar />
      <div className="cart-container">
        {loading ? (
          <p>Loading...</p>
        ) : cartItems.length === 0 && !error ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.imageLink}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>

                  <p>Price: ${item.price}</p>
                  <button
                    onClick={() => removeFromCart(item.productId)} // Remove item by productId
                    className="remove-item-btn"
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer with total price and checkout button */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <h3>Total: ${calculateTotal()}</h3>
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
