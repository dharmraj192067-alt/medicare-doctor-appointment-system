import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const res = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setName(res.data.user.name);
      setEmail(res.data.user.email);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    try {
      await api.put(
        "/users/profile",
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = JSON.parse(localStorage.getItem("user"));
      user.name = name;
      user.email = email;
      localStorage.setItem("user", JSON.stringify(user));

      alert("Profile Updated Successfully ✅");
    } catch (error) {
      console.log(error);
    }
  };

  const changePassword = async () => {
    try {
      await api.put(
        "/users/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Password Changed Successfully ✅");

      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "Password Change Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top left, #18304f 0%, #0d1b2e 45%, #07111f 100%)",
        padding: "40px",
        color: "var(--text)",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "var(--panel)",
          borderRadius: "15px",
          boxShadow: "0 8px 20px var(--shadow)",
          overflow: "hidden",
          color: "var(--text)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--primary-dark), var(--primary))",
            color: "var(--text)",
            textAlign: "center",
            padding: "30px",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: "5px solid white",
              marginBottom: "15px",
            }}
          />

          <h2>{name}</h2>
          <p>{email}</p>
        </div>

        {/* Profile Info */}
        <div style={{ padding: "30px" }}>
          <h2 style={{ color: "var(--accent)" }}>Edit Profile</h2>

          <label style={{ color: "var(--text)" }}>Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ ...inputStyle, background: "var(--panel-strong)", color: "var(--text)", borderColor: "var(--border)" }}
          />

          <label style={{ color: "var(--text)" }}>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ ...inputStyle, background: "var(--panel-strong)", color: "var(--text)", borderColor: "var(--border)" }}
          />

          <button style={blueBtn} onClick={updateProfile}>
            Update Profile
          </button>

          <hr style={{ margin: "35px 0" }} />

          <h2 style={{ color: "var(--accent)" }}>
            Change Password
          </h2>

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
            style={{ ...inputStyle, background: "var(--panel-strong)", color: "var(--text)", borderColor: "var(--border)" }}
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            style={{ ...inputStyle, background: "var(--panel-strong)", color: "var(--text)", borderColor: "var(--border)" }}
          />

          <button
            style={greenBtn}
            onClick={changePassword}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0 20px",
  borderRadius: "8px",
  border: "1px solid var(--border)",
  fontSize: "16px",
};

const blueBtn = {
  width: "100%",
  padding: "12px",
  background: "var(--primary)",
  color: "var(--text)",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

const greenBtn = {
  width: "100%",
  padding: "12px",
  background: "#16a34a",
  color: "var(--text)",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Profile;