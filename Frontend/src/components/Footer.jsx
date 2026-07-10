import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2>🏥 Medicare</h2>
          <p>
            Your trusted healthcare partner. Book appointments with experienced
            doctors anytime, anywhere.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <p>Home</p>
          <p>Doctors</p>
          <p>Appointments</p>
          <p>Profile</p>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>

          <p>📍 Kathmandu, Nepal</p>
          <p>📞 +977-9800000000</p>
          <p>📧 medicare@gmail.com</p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 Medicare. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;