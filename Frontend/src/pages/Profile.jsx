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
    <div className="container section">
      <div className="profile-grid">
        <div className="profile-panel detail-card">
          <div style={{ textAlign: 'center' }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
              className="profile-avatar"
            />
            <h2>{name}</h2>
            <p>{email}</p>
          </div>

          <div className="profile-buttons">
            <button className="button-primary" type="button" onClick={updateProfile}>
              Update Profile
            </button>
          </div>
        </div>

        <div className="profile-panel detail-card profile-form">
          <div className="input-group">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Current Password</label>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="profile-buttons">
            <button className="button-secondary" type="button" onClick={changePassword}>
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
