import mongoose from "mongoose";
import { nanoid } from "nanoid";

// Order schema with productId and quantity
const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    default: nanoid, // Automatically generate a unique orderId
  },
  productId: {
    type: String,
    required: true, // productId will be required
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// User schema that embeds the order schema as an array
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },
    password: { type: String, required: true },
    cart: { type: Array, default: [] },
    orders: [orderSchema], // Embed the orders schema as an array for the user
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  }
);

const User = mongoose.model("User", userSchema);

export default User;
