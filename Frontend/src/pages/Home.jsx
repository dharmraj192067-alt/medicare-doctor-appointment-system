import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <>
      <section className="hero" data-aos="fade-up">
        <div className="hero-left" data-aos="fade-right">
          <h1>Book Your Doctor Appointment Online</h1>

          <p>
            Find experienced doctors, book appointments instantly and manage
            your healthcare from anywhere.
          </p>

          <div className="hero-buttons">
            <Link to="/doctors">
              <button className="primary-btn">Find Doctors</button>
            </Link>

            <Link to="/register">
              <button className="secondary-btn">Get Started</button>
            </Link>
          </div>
        </div>

        <div className="hero-right" data-aos="fade-left">
          <img
            src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=600"
            alt="Doctor"
          />
        </div>
      </section>

      <section className="stats-section">
        <div>
          <h1>50+</h1>
          <p>Doctors</p>
        </div>

        <div>
          <h1>1000+</h1>
          <p>Patients</p>
        </div>

        <div>
          <h1>24/7</h1>
          <p>Support</p>
        </div>

        <div>
          <h1>99%</h1>
          <p>Success Rate</p>
        </div>
      </section>

      <section className="features">
        <h2 data-aos="fade-up">Why Choose Medicare?</h2>

        <div className="feature-grid">
          <div className="feature-card" data-aos="zoom-in">
            <h3>👨‍⚕️ Expert Doctors</h3>
            <p>Consult experienced specialists from different departments.</p>
          </div>

          <div className="feature-card" data-aos="zoom-in">
            <h3>📅 Easy Booking</h3>
            <p>Book appointments online in just a few clicks.</p>
          </div>

          <div className="feature-card" data-aos="zoom-in">
            <h3>🕒 24/7 Support</h3>
            <p>We're available anytime to assist your healthcare needs.</p>
          </div>

          <div className="feature-card" data-aos="zoom-in">
            <h3>💊 Trusted Service</h3>
            <p>Secure, reliable and patient-focused healthcare platform.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;