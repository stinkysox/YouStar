import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Login from "./pages/Login/Login";
import Checkout from "./pages/CheckOut/CheckOut";
import AboutUs from "./pages/AboutUs/AboutUs";
import Contact from "./pages/Contact/Contact";
import ProtectedRoute from "./components/protectedRoute";
import Cart from "./pages/Cart/Cart";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/admin/add-product" element={<AdminAddProduct />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home /> {/* Home is protected */}
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:category"
            element={
              <ProtectedRoute>
                <Products /> {/* Products is protected */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart /> {/* Cart is protected */}
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Add ToastContainer here */}
        <ToastContainer />
      </Router>
    </div>
  );
};

export default App;
