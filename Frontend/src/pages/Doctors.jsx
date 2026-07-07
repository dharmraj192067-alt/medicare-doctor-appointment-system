import { useEffect, useState } from "react";
import api from "../services/api";
import DoctorCard from "../components/DoctorCard";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    try {
      const res = await api.get("/doctors", {
        params: {
          search: search,
        },
      });

      setDoctors(res.data.doctors);
    } catch (error) {
      console.log("API Error:", error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Our Doctors</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          margin: "25px 0",
        }}
      >
        <input
          type="text"
          placeholder="Search Doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
          }}
        />

        <button onClick={getDoctors}>
          Search
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))
        ) : (
          <h3>No Doctor Found</h3>
        )}
      </div>
    </div>
  );
}

export default Doctors;