import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";

function MyAppointments() {
  const location = useLocation();
  const [appointments, setAppointments] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(Boolean(location.state?.successMessage));

  useEffect(() => {
    getAppointments();
  }, []);

  useEffect(() => {
    if (!location.state?.successMessage) return;

    setShowSuccessMessage(true);
    const timer = setTimeout(() => setShowSuccessMessage(false), 3000);

    return () => clearTimeout(timer);
  }, [location.state?.successMessage]);

  const getAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/appointments/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments(res.data.appointments);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h2>My Appointments</h2>
          <p>Review your upcoming and past appointments in one place.</p>
        </div>
      </div>

      {showSuccessMessage && (
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
          {location.state?.successMessage}
        </div>
      )}

      {appointments.length === 0 ? (
        <h3>No Appointments Found</h3>
      ) : (
        appointments.map((item) => (
          <div className="appointment-card" key={item._id}>
            <h2>{item.doctor.name}</h2>
            <p>
              <strong>Specialization:</strong> {item.doctor.specialization}
            </p>
            <p>
              <strong>Experience:</strong> {item.doctor.experience} Years
            </p>
            <p>
              <strong>Fees:</strong> Rs. {item.doctor.fees}
            </p>
            <p>
              <strong>Date:</strong> {item.appointmentDate}
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
          </div>
        ))
      )}
    </div>
  );
}

export default MyAppointments;
