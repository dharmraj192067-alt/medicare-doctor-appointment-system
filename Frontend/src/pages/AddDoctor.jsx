import { useState } from "react";
import api from "../services/api";

function AddDoctor() {
  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
    experience: "",
    fees: "",
    available: true,
    image: null,
  });

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

  const addDoctor = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", doctor.name);
      formData.append("specialization", doctor.specialization);
      formData.append("experience", doctor.experience);
      formData.append("fees", doctor.fees);
      formData.append("available", doctor.available);
      formData.append("image", doctor.image);

      await api.post("/doctors", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Doctor Added Successfully ✅");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="container section">
      <div className="form-panel" style={{ maxWidth: "560px", margin: "0 auto" }}>
        <h2>Add Doctor</h2>
        <form onSubmit={addDoctor} className="form-grid">
          <div className="input-group">
            <label>Name</label>
            <input name="name" value={doctor.name} onChange={handleChange} placeholder="Doctor Name" required />
          </div>
          <div className="input-group">
            <label>Specialization</label>
            <input name="specialization" value={doctor.specialization} onChange={handleChange} placeholder="Specialization" required />
          </div>
          <div className="input-group">
            <label>Experience</label>
            <input name="experience" type="number" value={doctor.experience} onChange={handleChange} placeholder="Experience" required />
          </div>
          <div className="input-group">
            <label>Fees</label>
            <input name="fees" type="number" value={doctor.fees} onChange={handleChange} placeholder="Fees" required />
          </div>
          <div className="input-group">
            <label>Doctor Image</label>
            <input name="image" type="file" accept="image/*" onChange={handleChange} />
          </div>
          <div className="form-actions">
            <button className="button-primary" type="submit">
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDoctor;
