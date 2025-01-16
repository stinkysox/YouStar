import React, { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { productsListArray } from "../../assets/ProductsList";
import { GlobalContext } from "../../context/GlobalContext";
import "./Products.css";

const Products = () => {
  const { category } = useParams();
  const { addToCart, cart } = useContext(GlobalContext);

  const filteredProducts = productsListArray.filter(
    (product) => product.category === category
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    console.log(cart);
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
