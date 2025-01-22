import React from "react";
import axios from "axios";
import { useState } from "react";
import "./AdminAddProduct.css";

const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    gender: "male", // default gender
    category: "",
    image: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation (optional)
    if (
      !product.name ||
      !product.price ||
      !product.category ||
      !product.image
    ) {
      setError("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("gender", product.gender);
    formData.append("category", product.category);
    formData.append("description", product.description);
    formData.append("image", product.image);

    try {
      // API request to add the product
      const response = await axios.post(
        "http://localhost:5000/api/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess(response.data.message);
      setProduct({
        name: "",
        price: "",
        gender: "male",
        category: "",
        image: "",
        description: "",
      });
      setError("");
    } catch (err) {
      setError("Error adding product: " + err.response.data.message);
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
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="admin-add-product-input"
            placeholder="Enter product name"
          />
        </div>

        <div className="admin-add-product-form-group">
          <label className="admin-add-product-label" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="admin-add-product-input"
            placeholder="Enter product price"
          />
        </div>

        <div className="admin-add-product-form-group">
          <label className="admin-add-product-label" htmlFor="gender">
            Gender
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
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="admin-add-product-input"
            placeholder="Enter product category"
          />
        </div>

        <div className="admin-add-product-form-group">
          <label className="admin-add-product-label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="admin-add-product-input"
            placeholder="Enter product description"
          ></textarea>
        </div>

        <div className="admin-add-product-form-group">
          <label className="admin-add-product-label" htmlFor="image">
            Product Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            className="admin-add-product-input"
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
