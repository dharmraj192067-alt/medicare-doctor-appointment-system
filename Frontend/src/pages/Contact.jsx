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
    <div className="container section">
      <div className="contact-layout">
        <div className="contact-panel detail-card">
          <h2>Contact Medicare</h2>
          <p>Feel free to contact us for any questions or appointment assistance.</p>

          <div style={{ marginTop: '24px' }}>
            <h4>Address</h4>
            <p>Butwal, Rupandehi, Nepal</p>
            <h4>Phone</h4>
            <p>+977 98XXXXXXXX</p>
            <h4>Email</h4>
            <p>medicare@gmail.com</p>
            <h4>Working Hours</h4>
            <p>Sunday - Friday</p>
            <p>9:00 AM - 5:00 PM</p>
          </div>
        </div>

        <div className="contact-card detail-card">
          <h2>Send Message</h2>
          <form onSubmit={sendMessage} className="form-grid">
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Subject</label>
              <input type="text" name="subject" value={form.subject} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows="6" required />
            </div>
            <div className="form-actions">
              <button className="button-primary" type="submit">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
