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

    console.log("Token:", token);
    console.log("Image:", doctor.image);

    const formData = new FormData();
    formData.append("name", doctor.name);
    formData.append("specialization", doctor.specialization);
    formData.append("experience", doctor.experience);
    formData.append("fees", doctor.fees);
    formData.append("available", doctor.available);
    formData.append("image", doctor.image);

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const res = await api.post("/doctors", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);

    alert("Doctor Added Successfully ✅");
  } catch (error) {
    console.log(error.response?.data);
  }
};
  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h1>Add Doctor</h1>

      <form onSubmit={addDoctor}>
        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={doctor.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={doctor.specialization}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="number"
          name="experience"
          placeholder="Experience"
          value={doctor.experience}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="number"
          name="fees"
          placeholder="Fees"
          value={doctor.fees}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Add Doctor
        </button>
      </form>
    </div>
  );
}

export default AddDoctor;