import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    gender: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
