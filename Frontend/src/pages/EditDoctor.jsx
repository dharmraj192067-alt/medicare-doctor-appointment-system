import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
    experience: "",
    fees: "",
    image: null,
  });

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const res = await api.get(`/doctors/${id}`);

      setDoctor({
        name: res.data.doctor.name,
        specialization: res.data.doctor.specialization,
        experience: res.data.doctor.experience,
        fees: res.data.doctor.fees,
        image: null,
      });
    } catch (error) {
      console.log(error);
      alert("Doctor load failed");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setDoctor({
        ...doctor,
        image: e.target.files[0],
      });
    } else {
      setDoctor({
        ...doctor,
        [e.target.name]: e.target.value,
      });
    }
  };

  const updateDoctor = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("name", doctor.name);
      formData.append("specialization", doctor.specialization);
      formData.append("experience", doctor.experience);
      formData.append("fees", doctor.fees);

      if (doctor.image) {
        formData.append("image", doctor.image);
      }

      await api.put(`/doctors/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Doctor Updated Successfully ✅");
      navigate("/doctors");
    } catch (error) {
  console.log("Status:", error.response?.status);
  console.log("Data:", error.response?.data);
  console.log(error);

  alert(error.response?.data?.message || "Update Failed");
}
  };

  return (
    <div style={{ maxWidth: "520px", margin: "40px auto", padding: "30px", background: "var(--panel)", borderRadius: "16px", boxShadow: "0 12px 30px var(--shadow)", border: "1px solid var(--border)" }}>
      <h1 style={{ marginBottom: "20px", color: "var(--accent)" }}>Edit Doctor</h1>

      <form onSubmit={updateDoctor}>
        <input
          type="text"
          name="name"
          value={doctor.name}
          onChange={handleChange}
          placeholder="Doctor Name"
          required
          style={{ width: "100%", padding: "12px", marginBottom: "15px", background: "var(--panel-strong)", color: "var(--text)" }}
        />

        <input
          type="text"
          name="specialization"
          value={doctor.specialization}
          onChange={handleChange}
          placeholder="Specialization"
          required
          style={{ width: "100%", padding: "12px", marginBottom: "15px", background: "var(--panel-strong)", color: "var(--text)" }}
        />

        <input
          type="number"
          name="experience"
          value={doctor.experience}
          onChange={handleChange}
          placeholder="Experience"
          required
          style={{ width: "100%", padding: "12px", marginBottom: "15px", background: "var(--panel-strong)", color: "var(--text)" }}
        />

        <input
          type="number"
          name="fees"
          value={doctor.fees}
          onChange={handleChange}
          placeholder="Fees"
          required
          style={{ width: "100%", padding: "12px", marginBottom: "15px", background: "var(--panel-strong)", color: "var(--text)" }}
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "15px", color: "var(--muted)" }}
        />

        <button type="submit" style={{ width: "100%", padding: "12px", background: "var(--primary)", color: "var(--text)", border: "none", borderRadius: "8px" }}>Update Doctor</button>
      </form>
    </div>
  );
}

export default EditDoctor;