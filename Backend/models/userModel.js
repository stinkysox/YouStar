import mongoose from "mongoose";
import { nanoid } from "nanoid";

// Order schema with updated structure
const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      default: nanoid(), // Automatically generate a unique orderId
    },
    userId: {
      type: String,
      required: true, // User who placed the order
    },
    products: [
      {
        productId: {
          type: String,
          required: true, // productId will be required
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ], // Array of products with their productIds and quantities
    shippingAddress: {
      type: String,
      required: true, // Shipping address will be required
    },
    paymentDetails: {
      cardNumber: {
        type: String,
        required: true, // Card number required for payment
      },
      expirationDate: {
        type: String,
        required: true, // Expiration date required
      },
      cvv: {
        type: String,
        required: true, // CVV required for payment
      },
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields to each order
  }
);

// User schema with updated orders array
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
    orders: [orderSchema], // Embed the updated order schema as an array for the user
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields to the user
  }
);

const User = mongoose.model("User", userSchema);

export default User;
