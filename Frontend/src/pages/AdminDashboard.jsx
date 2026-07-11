import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/admin.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    getAppointments();
    getStats();
  }, []);

  const getAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data.appointments);
    } catch (error) {
      console.log(error);
    }
  };

  const getStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}`, { status });

      alert(`Appointment ${status} Successfully ✅`);
      getAppointments();
      getStats();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;

    try {
      await api.delete(`/appointments/${id}`);

      alert("Appointment Deleted Successfully ✅");
      getAppointments();
      getStats();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredAppointments =
    filter === "All"
      ? appointments
      : appointments.filter((item) => item.status === filter);

  return (
    <div style={{ padding: "40px" }}>

      
     
      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        
        <div
          className="card"
          style={{ cursor: "pointer" }}
          onClick={() => setFilter("Approved")}
        >
          <h3>✅ Approved</h3>
          <h1>
            {appointments.filter((a) => a.status === "Approved").length}
          </h1>
        </div>

        <div
          className="card"
          style={{ cursor: "pointer" }}
          onClick={() => setFilter("Completed")}
        >
          <h3>🎉 Completed</h3>
          <h1>
            {appointments.filter((a) => a.status === "Completed").length}
          </h1>
        </div>

        <div
          className="card"
          style={{ cursor: "pointer" }}
          onClick={() => setFilter("Rejected")}
        >
          <h3>❌ Rejected</h3>
          <h1>
            {appointments.filter((a) => a.status === "Rejected").length}
          </h1>
        </div>
      </div>

      <h2>Total Appointments : {filteredAppointments.length}</h2>

      {filteredAppointments.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0 0 10px rgba(0,0,0,.1)",
            background: "#f5f5f5",
          }}
        >
          <h3>{item.patient?.name}</h3>

          <p>
            <strong>Doctor:</strong> {item.doctor?.name}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(item.appointmentDate).toLocaleDateString()}
          </p>

          <p>
            <strong>Time:</strong> {item.time}
          </p>

          <p>
            <strong>Reason:</strong> {item.reason}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color:
                  item.status === "Approved"
                    ? "green"
                    : item.status === "Rejected"
                    ? "red"
                    : item.status === "Completed"
                    ? "blue"
                    : "orange",
                fontWeight: "bold",
              }}
            >
              {item.status}
            </span>
          </p>

          <div style={{ marginTop: "15px" }}>
            <button
              onClick={() => updateStatus(item._id, "Approved")}
              style={{
                background: "green",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              Approve
            </button>

            <button
              onClick={() => updateStatus(item._id, "Completed")}
              style={{
                background: "blue",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              Complete
            </button>

            <button
              onClick={() => updateStatus(item._id, "Rejected")}
              style={{
                background: "orange",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              Reject
            </button>

            <button
              onClick={() => deleteAppointment(item._id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
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