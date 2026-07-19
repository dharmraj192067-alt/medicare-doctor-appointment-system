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
    <nav className="topbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <span className="material-symbols-outlined brand-icon">medical_services</span>
          <span>Medicare</span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>

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

          {user?.role === "admin" && token && (
            <li>
              <Link to="/admin">Admin Dashboard</Link>
            </li>
          )}
        </ul>

        <div className="nav-actions">
          {!token ? (
            <>
              <Link to="/login" className="button-ghost">
                Login
              </Link>
              <Link to="/register" className="button-primary">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="nav-user">👤 {user?.name}</span>
              <button className="button-ghost" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
