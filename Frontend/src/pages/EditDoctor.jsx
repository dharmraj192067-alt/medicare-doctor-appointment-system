import { useEffect, useState } from "react";
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
    <div className="container section">
      <div className="form-panel" style={{ maxWidth: "560px", margin: "0 auto" }}>
        <h2>Edit Doctor</h2>

        <form onSubmit={updateDoctor} className="form-grid">
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
              Update Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDoctor;
