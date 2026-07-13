import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
const [payment, setPayment] = useState("Khalti");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
console.log("Doctor ID:", doctorId);
console.log("Date:", date);
console.log("Time:", time);
console.log("Reason:", reason);
  try {
    const token = localStorage.getItem("token");
alert(`Payment Successful ✅

Method: ${payment}

Transaction ID: TXN${Math.floor(Math.random() * 1000000)}`);
    await api.post(
      "/appointments",
      {
        doctor: doctorId,
        appointmentDate: date,
        time:time,
        reason: reason,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Appointment Booked Successfully ✅");
    navigate("/appointments");

  } catch (error) {
  console.log(error.response.data);
  console.log(error.response.data.errors);

  alert(error.response.data.message);
};
};
  return (
    <div style={{ maxWidth: "520px", margin: "40px auto", padding: "30px", background: "var(--panel)", borderRadius: "16px", boxShadow: "0 12px 30px var(--shadow)", border: "1px solid var(--border)", color: "var(--text)" }}>
      <h1 style={{ marginBottom: "20px", color: "var(--accent)" }}>Book Appointment</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{ width: "100%", padding: "12px", marginBottom: "15px", background: "var(--panel-strong)", color: "var(--text)" }}
        />

        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          style={{ width: "100%", padding: "12px", marginBottom: "15px", background: "var(--panel-strong)", color: "var(--text)" }}
        >
          <option value="">Select Time</option>
          <option>10:00 AM</option>
          <option>11:00 AM</option>
          <option>12:00 PM</option>
          <option>2:00 PM</option>
          <option>3:00 PM</option>
        </select>

        <br /><br />

        <textarea
  placeholder="Reason / Symptoms"
  value={reason}
  onChange={(e) => setReason(e.target.value)}
  rows="5"
  style={{ width: "100%", padding: "12px", marginBottom: "15px", background: "var(--panel-strong)", color: "var(--text)" }}
/>

<br /><br />

<h3>Payment Method</h3>

<label>
  <input
    type="radio"
    name="payment"
    value="Khalti"
    checked={payment === "Khalti"}
    onChange={(e) => setPayment(e.target.value)}
  />
  🟣 Khalti
</label>

<br /><br />

<label>
  <input
    type="radio"
    name="payment"
    value="eSewa"
    checked={payment === "eSewa"}
    onChange={(e) => setPayment(e.target.value)}
  />
  🟢 eSewa
</label>

<br /><br />

<label>
  <input
    type="radio"
    name="payment"
    value="Cash"
    checked={payment === "Cash"}
    onChange={(e) => setPayment(e.target.value)}
  />
  💵 Cash
</label>

<br /><br />

<h3>Consultation Fee : Rs. 1000</h3>

<br />

<button type="submit" style={{ width: "100%", padding: "12px", background: "var(--primary)", color: "var(--text)", border: "none", borderRadius: "8px" }}>
  Confirm Appointment
</button>

      </form>
    </div>
  );
}

export default BookAppointment;