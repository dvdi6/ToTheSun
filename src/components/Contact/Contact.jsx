import Footer from "../Footer"
import emailjs from "emailjs-com"
import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
      });
    
      const [successMessage, setSuccessMessage] = useState("");
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        emailjs
          .send(
            "service_srw4lzj", // Replace with your EmailJS service ID
            "template_q2r71i9", // Replace with your EmailJS template ID
            formData,
            "vWS7shaUkCYd4w5st" // Replace with your EmailJS user ID
          )
          .then(
            (result) => {
              setSuccessMessage("Thank you for your feedback! We'll get back to you soon.");
              setFormData({ name: "", email: "", message: "" });
            },
            (error) => {
              setSuccessMessage("Oops! Something went wrong. Please try again later.");
            }
          );
      };
    
      return (
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "20px" }}>
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "10px", margin: "10px 0" }}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "10px", margin: "10px 0" }}
              />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "10px", margin: "10px 0", height: "100px" }}
              />
            </div>
            <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
              Send Feedback
            </button>
          </form>
          {successMessage && <p style={{ marginTop: "10px" }}>{successMessage}</p>}
          <Footer />
        </div>
      )
}