import emailjs from "emailjs-com"
import { useState } from "react"
import "./Contact.css"


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
            "service_srw4lzj", 
            "template_q2r71i9", 
            formData,
            "vWS7shaUkCYd4w5st" 
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
        <div className="contact-container">
          <h2>Contact Us</h2>
          <p>Give us feedback, or ask your questions about our application.</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="contact-inputs"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="contact-inputs"
                value={formData.email}
                onChange={handleChange}
                required
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
                className="contact-inputs"
              />
            </div>
            <button className="submit-btn" type="submit">
              Send Feedback
            </button>
          </form>
          {successMessage && <p className="succes-message">{successMessage}</p>}
        </div>
      )
}