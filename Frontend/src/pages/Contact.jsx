import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const isDark = document.body.classList.contains("dark");

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
        color: isDark ? "white" : "black",
      }}
    >
      {/* Left */}
      <div
        style={{
          flex: 1,
          background: "#1e40af",
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
          background: isDark ? "#1e293b" : "#fff",
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
              background:isDark ? "#334155" : "white",
              color: isDark ? "white" : "black",
              border: isDark ? "1px solid #475569" : "1px solid #ccc",
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
              background: "#1e40af",
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