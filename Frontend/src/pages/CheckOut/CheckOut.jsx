import React, { useContext, useState } from "react";
import "./Checkout.css";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { user, cart, setCart } = useContext(GlobalContext); // Access cart data from the context
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false); // New state to track if the order is placed

  // Calculate the total price from cart items in the context
  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2); // Return the total price rounded to two decimal places
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Map through the cart to get an array of productIds
    const productIds = cart.map((item) => item.productId);

    const orderData = {
      userId: user.userId,
      products: productIds, // Send only product IDs
      totalPrice: getTotalPrice(),
      shippingAddress: formData.address,
      paymentDetails: {
        cardNumber: formData.cardNumber,
        expirationDate: formData.expirationDate,
        cvv: formData.cvv,
      },
    };

    try {
      const response = await axios.post("http://localhost:4000/placeorder", {
        orderData,
      });

      console.log(response);

      setCart([]); // Clear the cart after successful order placement
      localStorage.removeItem("cart"); // Remove cart from localStorage
      setOrderPlaced(true); // Set orderPlaced to true to trigger the confirmation message
    } catch (error) {
      console.log(error);
      alert("Error placing the order. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="checkout-container">
        {!orderPlaced ? (
          <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Checkout</h2>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Shipping Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>

            <h3>Card Details</h3>

            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="expirationDate">Expiration Date</label>
              <input
                type="text"
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Complete Purchase
            </button>
          </form>
        ) : (
          <div className="order-complete-container">
            <h2>Order Completed</h2>
            <p>Your order has been successfully placed!</p>
            <div className="checkmark">&#10004;</div>
            <button
              className="continue-shopping-btn"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
            <img
              src="https://i.postimg.cc/vH9zHsLb/download-8.jpg"
              className="cat"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
