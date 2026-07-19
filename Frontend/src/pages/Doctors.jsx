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
    <div className="container section">
      <div className="section-head">
        <div>
          <h2>Our Doctors</h2>
          <p>Find top specialists and book your next appointment with ease.</p>
        </div>
      </div>

      <div className="search-row">
        <input
          type="text"
          placeholder="Search Doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={getDoctors} className="button-primary">
          Search
        </button>
      </div>

      {doctors.length > 0 ? (
        <div className="grid-responsive">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <h3>No Doctor Found</h3>
      )}
    </div>
  );
}

export default Doctors;
