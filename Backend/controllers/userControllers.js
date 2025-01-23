import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Product from "../models/productsModel.js";

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
    const hashedPassword = await bcryptjs.hash(password, saltRounds);

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
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "3h" }
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
  console.log(product._id);

  try {
    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product is already in the cart (to avoid duplicates)
    const productExists = user.cart.some(
      (item) => item.productId === product._id
    );

    if (productExists) {
      return res
        .status(400)
        .json({ message: "Product already exists in the cart" });
    } else {
      // If the product doesn't exist in the cart, add it
      user.cart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
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
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.cart.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
};

export const removeItemFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  console.log(userId, productId);

  if (!userId || !productId) {
    return res
      .status(400)
      .json({ message: "User ID and Product ID are required" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.updateOne({ _id: userId }, { $pull: { cart: { productId } } });

    const updatedUser = await User.findById(userId);

    res
      .status(200)
      .json({ message: "Item removed from cart", cart: updatedUser.cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const placeOrder = async (req, res) => {
  const { orderData } = req.body;
  console.log(orderData);

  try {
    // Destructure the orderData object
    const { userId, products, shippingAddress, paymentDetails } = orderData;

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the order object with only the necessary data
    const order = {
      userId,
      products, // The array of product IDs
      shippingAddress, // The shipping address
      paymentDetails, // The payment details (card number, expiration, CVV)
      totalPrice: orderData.totalPrice, // Total price (sent from the frontend)
      date: new Date(), // Order date
    };

    // Add the order to the user's orders array
    user.orders.push(order);

    // Clear the user's cart after placing the order
    user.cart = [];

    // Save the updated user with the new order and cleared cart
    await user.save();

    // Respond with a success message and the updated orders array
    res.status(200).json({
      message: "Order placed successfully",
      orders: user.orders, // Return the updated orders array
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place the order" });
  }
};

export const addProducts = async (req, res) => {
  try {
    const productsArray = req.body; // Get the array of products from the request body

    // Insert the products into the database and wait for the response
    const savedProducts = await Product.insertMany(productsArray);

    // Return a success response with the saved products
    res.status(200).json({
      success: true,
      message: "Products added successfully",
      products: savedProducts,
    });
  } catch (error) {
    // Return an error response if something goes wrong
    res.status(500).json({
      success: false,
      message: "Error saving products",
      error: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Return the fetched products as a response
    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    // Return an error response if something goes wrong
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

export const addSingleProduct = async (req, res) => {
  const { product } = req.body;
  res.status(200).send({ product });
};

// Export the function
