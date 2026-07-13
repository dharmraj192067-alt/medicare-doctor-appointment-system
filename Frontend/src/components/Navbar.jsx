import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logout Successful ✅");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link
          to="/"
          style={{ textDecoration: "none", color: "var(--text)" }}
        >
          🏥 Medicare
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* Patient Only */}
        {user?.role !== "admin" && (
          <>
            <li>
              <Link to="/doctors">Doctors</Link>
            </li>

            {token && (
              <>
                <li>
                  <Link to="/appointments">Appointments</Link>
                </li>

                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
  <Link to="/contact">Contact</Link>
</li>
              </>
            )}
          </>
        )}

        {/* Admin Only */}
        {user?.role === "admin" && token && (
          <li>
            <Link to="/admin">Admin Dashboard</Link>
          </li>
        )}
      </ul>

      <div className="nav-buttons">
        {!token ? (
          <>
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>

            <Link to="/register">
              <button className="register-btn">Register</button>
            </Link>
          </>
        ) : (
          <>
            <span
              style={{
                color: "var(--text)",
                marginRight: "15px",
                fontWeight: "bold",
              }}
            >
              👤 {user?.name}
            </span>

            <button
              className="login-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;