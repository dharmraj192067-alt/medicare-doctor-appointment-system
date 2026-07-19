import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const location = useLocation();
  const [showSuccessMessage, setShowSuccessMessage] = useState(Boolean(location.state?.successMessage));

  useEffect(() => {
    if (!location.state?.successMessage) return;

    setShowSuccessMessage(true);
    const timer = setTimeout(() => setShowSuccessMessage(false), 3000);

    return () => clearTimeout(timer);
  }, [location.state?.successMessage]);

  return (
    <main>
      <section className="hero-section">
        <div className="container hero-inner">
          <div className="hero-panel">
            <span className="hero-badge">
              <span className="material-symbols-outlined">health_and_safety</span>
              Trusted healthcare partner
            </span>

            {showSuccessMessage && (
              <div
                style={{
                  marginBottom: "16px",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  background: "#e8f5e9",
                  color: "#2e7d32",
                  border: "1px solid #a5d6a7",
                  fontWeight: 600,
                }}
              >
                {location.state?.successMessage}
              </div>
            )}

            <h1 className="hero-title">
              Your Health,
              <br />
              <span>Our Priority</span>
            </h1>

            <p className="hero-lead">
              Experience world-class healthcare with Medicare. We connect you with top-rated specialists and offer 24/7 support for all your medical needs.
            </p>

            <div className="hero-actions">
              <Link to="/doctors" className="button-primary">
                <span className="material-symbols-outlined">calendar_month</span>
                Book Appointment
              </Link>
              <Link to="/register" className="button-secondary">
                View Our Services
              </Link>
            </div>

            <div className="section-label">
              <span className="material-symbols-outlined">verified</span>
              JCI Accredited • 500+ Specialists • 24/7 Support
            </div>
          </div>

          <div className="hero-media">
            <img
              src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=1200"
              alt="Modern healthcare clinic"
            />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Comprehensive Care Services</h2>
              <p>We provide a wide range of specialized medical services tailored to your individual health journey.</p>
            </div>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <h3>Cardiology</h3>
              <p>Expert heart care including diagnostics, prevention, and advanced treatment for cardiovascular conditions.</p>
            </div>
            <div className="feature-card">
              <h3>Neurology</h3>
              <p>Specialized care for disorders of the nervous system, providing cutting-edge neurological assessments.</p>
            </div>
            <div className="feature-card">
              <h3>Pediatrics</h3>
              <p>Comprehensive healthcare for infants, children, and adolescents in a warm, welcoming environment.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
