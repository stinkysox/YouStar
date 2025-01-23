import React, { useState } from "react";
import "./Contact.css";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    // Add form submission logic here
  };

  return (
    <div className="contact-us-container">
      <div className="contact-nav">
        <img
          src="https://i.postimg.cc/QtQfgDvd/30-Best-Greek-Logo-Design-Ideas-You-Should-Check.jpg"
          alt="Contact Us"
          className="contact-nav-image"
          onClick={() => navigate("/")}
        />
        <h3>YoungStar</h3>
      </div>
      <div className="contact-content">
        <div className="contact-text">
          <p>
            We’re always here to help! Reach out to us for any inquiries,
            feedback, or assistance. You can also use the contact form below to
            send us a message directly.
          </p>
          <div className="contact-info">
            <h3>Our Office</h3>
            <p>
              123 Fashion Street
              <br />
              Style City, FL 12345
              <br />
              Email: contact@youngstar.com
              <br />
              Phone: (123) 456-7890
            </p>
          </div>
        </div>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="contact-form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="contact-form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="contact-form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="contact-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
