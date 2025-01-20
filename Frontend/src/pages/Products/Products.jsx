import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { productsListArray } from "../../assets/ProductsList";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios"; // Import axios for API calls
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
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>Price: ₹{product.price}</p>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
