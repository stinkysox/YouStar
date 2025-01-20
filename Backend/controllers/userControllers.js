import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Controller to register a new user
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if password is at least 8 characters long
    if (password.length < 8) {
      return res.status(400).json({
        message:
          "Password is too short. It must be at least 8 characters long.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate a JWT token for the new user
    const token = jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "1h" }
    );

    // Respond with success
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
      token,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: "Server error. Could not register user.",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "1h" }
    );

    // Send success response with token and user details
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: "Server error. Could not log in.",
      error: error.message,
    });
  }
};

export const addToCart = async (req, res) => {
  const { userId, product } = req.body;

  try {
    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product is already in the cart (to avoid duplicates)
    const productExists = user.cart.some(
      (item) => item.productId === product.id
    );

    if (productExists) {
      return res
        .status(400)
        .json({ message: "Product already exists in the cart" });
    } else {
      // If the product doesn't exist in the cart, add it
      user.cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        imageLink: product.image,
        quantity: 1,
      });
    }

    // Save the updated user
    await user.save();

    // Respond with the updated cart
    return res.status(200).json({
      message: "Product added to cart",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getCartItems = async (req, res) => {
  const { userId } = req.body; // Get userId from the request body

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    // Find the user by userId and fetch the cart
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the cart is empty
    if (user.cart.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    // Respond with the cart items
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
};
