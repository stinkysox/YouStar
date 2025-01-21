import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
import { connectDB } from "./config/db.js";
import {
  addToCart,
  createUser,
  getCartItems,
  loginUser,
  placeOrder,
  removeItemFromCart,
} from "./controllers/userControllers.js";
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

connectDB();

// Routes

app.post("/createuser", createUser);
app.post("/login", loginUser);
app.post("/addtocart", addToCart);
app.post("/getitems", getCartItems);
app.post("/removeitem", removeItemFromCart);
app.post("/placeorder", placeOrder);

app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
