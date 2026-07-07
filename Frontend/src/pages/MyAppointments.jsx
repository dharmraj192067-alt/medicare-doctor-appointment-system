import { useEffect, useState } from "react";
import api from "../services/api";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments();
  }, []);

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
    <div style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "30px" }}>My Appointments</h1>

      {appointments.length === 0 ? (
        <h2>No Appointments Found</h2>
      ) : (
        appointments.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2>{item.doctor.name}</h2>

            <p>
              <strong>Specialization:</strong>{" "}
              {item.doctor.specialization}
            </p>

            <p>
              <strong>Experience:</strong>{" "}
              {item.doctor.experience} Years
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
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    item.status === "Approved"
                      ? "green"
                      : item.status === "Cancelled"
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
          </div>
        ))
      )}
    </div>
  );
}

export default MyAppointments;