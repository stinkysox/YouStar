import React, { useState } from "react";
import axios from "axios";
import "./AdminAddProduct.css";

const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    gender: "male", // Default gender
    category: "clothes", // Default category
    image: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(product);

    try {
      const response = await axios.post(
        "https://youstar-d5y4.onrender.com/addproducts",
        product
      );
      setSuccess(response.data.message || "Product added successfully!");
      setError("");

      setProduct({
        name: "",
        price: "",
        gender: "male",
        category: "clothes",
        image: "",
        description: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
      setSuccess("");
    }
  };

  return (
    <div className="admin-add-product-container">
      <h2 className="admin-add-product-title">Add Product</h2>

      {error && <p className="admin-add-product-error">{error}</p>}
      {success && <p className="admin-add-product-success">{success}</p>}

      <form className="admin-add-product-form" onSubmit={handleSubmit}>
        <div className="admin-add-product-form-group">
          <label className="admin-add-product-label" htmlFor="name">
            Product Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="admin-add-product-input"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="admin-add-product-form-group">
          <label className="admin-add-product-label" htmlFor="price">
            Price <span className="required">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="admin-add-product-input"
            placeholder="Enter product price"
            required
          />
        </div>

        <div className="admin-add-product-form-group">
          <label className="admin-add-product-label" htmlFor="gender">
            Gender <span className="required">*</span>
          </label>
          <select
            id="gender"
            name="gender"
            value={product.gender}
            onChange={handleInputChange}
            className="admin-add-product-input"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="admin-add-product-form-group">
          <label className="admin-add-product-label" htmlFor="category">
            Category <span className="required">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="admin-add-product-input"
          >
            <option value="clothes">Clothes</option>
            <option value="watches">Watches</option>
            <option value="footwear">Footwear</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        <div className="admin-add-product-form-group">
          <label className="admin-add-product-label" htmlFor="description">
            Description
          </label>
        </div>

        <div className="admin-add-product-form-group">
          <label className="admin-add-product-label" htmlFor="image">
            Product Image URL <span className="required">*</span>
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={product.image}
            onChange={handleInputChange}
            className="admin-add-product-input"
            placeholder="Enter image URL"
            required
          />
        </div>

        <button type="submit" className="admin-add-product-submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
