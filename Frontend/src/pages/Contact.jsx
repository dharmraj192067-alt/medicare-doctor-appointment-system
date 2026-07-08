import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    alert("Message Sent Successfully ✅");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "50px auto",
        display: "flex",
        gap: "40px",
        flexWrap: "wrap",
        padding: "20px",
      }}
    >
      {/* Left */}
      <div
        style={{
          flex: 1,
          background: "#0d6efd",
          color: "white",
          padding: "35px",
          borderRadius: "15px",
        }}
      >
        <h1>Contact Medicare</h1>

        <p style={{ marginTop: "20px" }}>
          Feel free to contact us for any questions or appointment assistance.
        </p>

        <hr />

        <h3>📍 Address</h3>
        <p>Butwal, Rupandehi, Nepal</p>

        <h3>📞 Phone</h3>
        <p>+977 98XXXXXXXX</p>

        <h3>📧 Email</h3>
        <p>medicare@gmail.com</p>

        <h3>🕒 Working Hours</h3>
        <p>Sunday - Friday</p>
        <p>9:00 AM - 5:00 PM</p>
      </div>

      {/* Right */}
      <div
        style={{
          flex: 1,
          background: "#fff",
          padding: "35px",
          borderRadius: "15px",
          boxShadow: "0 0 20px rgba(0,0,0,.1)",
        }}
      >
        <h2>Send Message</h2>

        <form onSubmit={sendMessage}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
            }}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
            }}
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
            }}
          />

          <textarea
            name="message"
            placeholder="Write your message..."
            rows="6"
            value={form.message}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#0d6efd",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "17px",
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;