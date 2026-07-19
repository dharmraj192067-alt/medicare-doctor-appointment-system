import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="brand footer-brand-name">
            <span className="material-symbols-outlined footer-icon">medical_services</span>
            <span>Medicare</span>
          </div>
          <p>
            Trusted healthcare partner bridging patients and top specialists with clarity and care.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/doctors">Doctors</a>
          <a href="/appointments">Appointments</a>
          <a href="/profile">Profile</a>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>📍 Kathmandu, Nepal</p>
          <p>📞 +977-9800000000</p>
          <p>📧 medicare@gmail.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Medicare. All rights reserved.</p>
        <button type="button" className="footer-top-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to Top
        </button>
      </div>
    </footer>
  );
}

export default Footer;
