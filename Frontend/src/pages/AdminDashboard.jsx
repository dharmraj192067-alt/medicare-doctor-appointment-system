import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/admin.css";

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState("All");
  const [feedback, setFeedback] = useState("");

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

  useEffect(() => {
    if (!feedback) return;

    const timer = setTimeout(() => setFeedback(""), 3000);
    return () => clearTimeout(timer);
  }, [feedback]);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}`, { status });
      setFeedback(`Appointment ${status} successfully.`);
      await Promise.all([getAppointments(), getStats()]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);
      setFeedback("Appointment deleted successfully.");
      await Promise.all([getAppointments(), getStats()]);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredAppointments =
    filter === "All"
      ? appointments
      : appointments.filter((item) => item.status === filter);

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h2>Admin Dashboard</h2>
          <p>Manage appointments, track status and review performance metrics.</p>
        </div>
      </div>

      {feedback && (
        <div
          style={{
            marginBottom: "16px",
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

      <div className="grid-3" style={{ marginBottom: '32px' }}>
        {['Approved', 'Completed', 'Rejected'].map((status) => (
          <div className="card" key={status} style={{ cursor: 'pointer' }} onClick={() => setFilter(status)}>
            <h3>{status}</h3>
            <h1>{appointments.filter((a) => a.status === status).length}</h1>
          </div>
        ))}
      </div>

      <h2 style={{ marginBottom: '24px' }}>Total Appointments : {filteredAppointments.length}</h2>

      {filteredAppointments.map((item) => (
        <div className="appointment-card" key={item._id}>
          <h3>{item.patient?.name}</h3>
          <p>
            <strong>Doctor:</strong> {item.doctor?.name}
          </p>
          <p>
            <strong>Date:</strong> {new Date(item.appointmentDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {item.time}
          </p>
          <p>
            <strong>Reason:</strong> {item.reason}
          </p>
          <p>
            <strong>Status:</strong>{' '}
            <span
              className={`status-pill ${
                item.status === 'Approved'
                  ? 'active'
                  : item.status === 'Rejected'
                  ? 'error'
                  : item.status === 'Completed'
                  ? 'success'
                  : ''
              }`}
            >
              {item.status}
            </span>
          </p>

          <div className="profile-buttons" style={{ justifyContent: 'flex-start' }}>
            <button className="button-primary" type="button" onClick={() => updateStatus(item._id, 'Approved')}>
              Approve
            </button>
            <button className="button-secondary" type="button" onClick={() => updateStatus(item._id, 'Completed')}>
              Complete
            </button>
            <button className="button-secondary" type="button" onClick={() => updateStatus(item._id, 'Rejected')}>
              Reject
            </button>
            <button className="button-ghost" type="button" onClick={() => deleteAppointment(item._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
