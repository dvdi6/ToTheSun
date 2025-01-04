import { useState } from "react";
import "./Contact.css";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Thank you for your feedback! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSuccessMessage("Oops! Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setSuccessMessage("Oops! Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="contact-container" role="main" aria-labelledby="contact-header">
      <h2 id="contact-header">Contact Us</h2>
      <p id="contact-description">
        Give us feedback, or ask your questions about our application.
      </p>
      <form
        onSubmit={handleSubmit}
        aria-labelledby="contact-header"
        aria-describedby="contact-description"
      >
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
            aria-required="true"
            aria-describedby="name-helper"
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
            aria-required="true"
            aria-describedby="email-helper"
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
            aria-required="true"
            aria-describedby="message-helper"
          />
          <p id="message-helper" className="input-helper">
            Share your feedback or ask your questions here.
          </p>
        </div>
        <button
          className="submit-btn"
          type="submit"
          aria-label="Send your feedback or question"
        >
          Send Feedback
        </button>
      </form>
      {successMessage && (
        <p className="success-message" role="status" aria-live="polite">
          {successMessage}
        </p>
      )}
    </div>
  );
}