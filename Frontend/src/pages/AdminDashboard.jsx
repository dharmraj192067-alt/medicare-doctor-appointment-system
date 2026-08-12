import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/admin.css";

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState("All");
  const [feedback, setFeedback] = useState("");

  const [doctorForm, setDoctorForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    fees: "",
    image: null,
  });

  useEffect(() => {
    getAppointments();
    getStats();
    getDoctors();
  }, []);

  const getAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data.appointments || []);
    } catch (error) {
      console.log("Appointment Error:", error);
    }
  };

  const getStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (error) {
      console.log("Stats Error:", error);
    }
  };

  const getDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data.doctors || []);
    } catch (error) {
      console.log("Doctor Error:", error);
    }
  };

  useEffect(() => {
    if (!feedback) return;

    const timer = setTimeout(() => {
      setFeedback("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [feedback]);

  const handleDoctorChange = (e) => {
    const { name, value, files } = e.target;

    setDoctorForm({
      ...doctorForm,
      [name]: files ? files[0] : value,
    });
  };

  const addDoctor = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", doctorForm.name);
      formData.append(
        "specialization",
        doctorForm.specialization
      );
      formData.append(
        "experience",
        doctorForm.experience
      );
      formData.append("fees", doctorForm.fees);

      if (doctorForm.image) {
        formData.append("image", doctorForm.image);
      }

      await api.post("/doctors", formData);

      setFeedback("Doctor added successfully.");

      setDoctorForm({
        name: "",
        specialization: "",
        experience: "",
        fees: "",
        image: null,
      });

      document.getElementById("doctorImage").value = "";

      await getDoctors();
    } catch (error) {
      console.log("Add Doctor Error:", error);

      setFeedback(
        error.response?.data?.message ||
          "Failed to add doctor."
      );
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await api.delete(`/doctors/${id}`);

      setFeedback("Doctor deleted successfully.");

      await getDoctors();
    } catch (error) {
      console.log("Delete Doctor Error:", error);

      setFeedback(
        error.response?.data?.message ||
          "Failed to delete doctor."
      );
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}`, { status });

      setFeedback(
        `Appointment ${status} successfully.`
      );

      await Promise.all([
        getAppointments(),
        getStats(),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);

      setFeedback(
        "Appointment deleted successfully."
      );

      await Promise.all([
        getAppointments(),
        getStats(),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredAppointments =
    filter === "All"
      ? appointments
      : appointments.filter(
          (item) => item.status === filter
        );

  return (
    <div className="container section">

      <div className="section-head">
        <div>
          <h2>Admin Dashboard</h2>
          <p>
            Manage doctors, appointments and
            healthcare services.
          </p>
        </div>
      </div>

      {feedback && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 16px",
            borderRadius: "8px",
            background: "#e8f5e9",
            color: "#2e7d32",
            border: "1px solid #a5d6a7",
            fontWeight: 600,
          }}
        >
          {feedback}
        </div>
      )}

      {/* ================= ADD DOCTOR ================= */}

      <div
        className="card"
        style={{
          marginBottom: "35px",
          padding: "25px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          👨‍⚕️ Add New Doctor
        </h2>

        <form onSubmit={addDoctor}>

          <input
            type="text"
            name="name"
            placeholder="Doctor Name"
            value={doctorForm.name}
            onChange={handleDoctorChange}
            required
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={doctorForm.specialization}
            onChange={handleDoctorChange}
            required
          />

          <input
            type="number"
            name="experience"
            placeholder="Experience (Years)"
            value={doctorForm.experience}
            onChange={handleDoctorChange}
            required
          />

          <input
            type="number"
            name="fees"
            placeholder="Consultation Fees"
            value={doctorForm.fees}
            onChange={handleDoctorChange}
            required
          />

          <input
            id="doctorImage"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleDoctorChange}
          />

          <button
            className="button-primary"
            type="submit"
            style={{ marginTop: "15px" }}
          >
            Add Doctor
          </button>

        </form>
      </div>

      {/* ================= DOCTOR LIST ================= */}

      <h2 style={{ marginBottom: "20px" }}>
        👨‍⚕️ Doctors ({doctors.length})
      </h2>

      {doctors.length > 0 ? (
        <div
          className="grid-responsive"
          style={{ marginBottom: "40px" }}
        >
          {doctors.map((doctor) => (
            <div
              className="card"
              key={doctor._id}
              style={{ padding: "20px" }}
            >

              {doctor.image && (
                <img
                  src={`${api.defaults.baseURL.replace(
                    "/api",
                    ""
                  )}/uploads/${doctor.image}`}
                  alt={doctor.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "15px",
                  }}
                />
              )}

              <h3>{doctor.name}</h3>

              <p>
                <strong>
                  Specialization:
                </strong>{" "}
                {doctor.specialization}
              </p>

              <p>
                <strong>
                  Experience:
                </strong>{" "}
                {doctor.experience} years
              </p>

              <p>
                <strong>Fees:</strong> Rs.{" "}
                {doctor.fees}
              </p>

              <button
                className="button-ghost"
                type="button"
                onClick={() =>
                  deleteDoctor(doctor._id)
                }
                style={{ marginTop: "10px" }}
              >
                Delete Doctor
              </button>

            </div>
          ))}
        </div>
      ) : (
        <p>No doctors found.</p>
      )}

      {/* ================= APPOINTMENT STATS ================= */}

      <div
        className="grid-3"
        style={{ marginBottom: "32px" }}
      >
        {[
          "Approved",
          "Completed",
          "Rejected",
        ].map((status) => (
          <div
            className="card"
            key={status}
            style={{ cursor: "pointer" }}
            onClick={() => setFilter(status)}
          >
            <h3>{status}</h3>

            <h1>
              {
                appointments.filter(
                  (a) => a.status === status
                ).length
              }
            </h1>
          </div>
        ))}
      </div>

      <h2 style={{ marginBottom: "24px" }}>
        Total Appointments :{" "}
        {filteredAppointments.length}
      </h2>

      {/* ================= APPOINTMENTS ================= */}

      {filteredAppointments.map((item) => (
        <div
          className="appointment-card"
          key={item._id}
        >
          <h3>{item.patient?.name}</h3>

          <p>
            <strong>Doctor:</strong>{" "}
            {item.doctor?.name}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(
              item.appointmentDate
            ).toLocaleDateString()}
          </p>

          <p>
            <strong>Time:</strong>{" "}
            {item.time}
          </p>

          <p>
            <strong>Reason:</strong>{" "}
            {item.reason}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`status-pill ${
                item.status === "Approved"
                  ? "active"
                  : item.status === "Rejected"
                  ? "error"
                  : item.status === "Completed"
                  ? "success"
                  : ""
              }`}
            >
              {item.status}
            </span>
          </p>

          <div
            className="profile-buttons"
            style={{
              justifyContent: "flex-start",
            }}
          >
            <button
              className="button-primary"
              type="button"
              onClick={() =>
                updateStatus(
                  item._id,
                  "Approved"
                )
              }
            >
              Approve
            </button>

            <button
              className="button-secondary"
              type="button"
              onClick={() =>
                updateStatus(
                  item._id,
                  "Completed"
                )
              }
            >
              Complete
            </button>

            <button
              className="button-secondary"
              type="button"
              onClick={() =>
                updateStatus(
                  item._id,
                  "Rejected"
                )
              }
            >
              Reject
            </button>

            <button
              className="button-ghost"
              type="button"
              onClick={() =>
                deleteAppointment(item._id)
              }
            >
              Delete
            </button>
          </div>
        </div>
      ))}

    </div>
  );
}

export default AdminDashboard;