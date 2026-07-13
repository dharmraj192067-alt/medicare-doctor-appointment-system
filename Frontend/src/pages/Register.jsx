import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/users/register", {
        name,
        email,
        password,
      });

      alert(res.data.message || "Registration Successful ✅");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "60px auto",
        padding: "30px",
        background: "var(--panel)",
        borderRadius: "12px",
        boxShadow: "0 15px 35px var(--shadow)",
        border: "1px solid var(--border)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "var(--accent)" }}>
        Register
      </h2>

      <form onSubmit={registerUser}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            background: "var(--panel-strong)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          }}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            background: "var(--panel-strong)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            background: "var(--panel-strong)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "var(--primary)",
            color: "var(--text)",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Register
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "20px", color: "var(--muted)" }}>
        Already have an account? <Link to="/login" style={{ color: "var(--accent)" }}>Login</Link>
      </p>
    </div>
  );
}

export default Register;