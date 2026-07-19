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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      await api.post(
        "/appointments",
        {
          doctor: doctorId,
          appointmentDate: date,
          time: time,
          reason: reason,
          paymentMethod: payment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/appointments", {
        state: { successMessage: "Appointment booked successfully!" },
      });
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Unable to book appointment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container section">
      <div className="form-panel" style={{ maxWidth: "560px", margin: "0 auto" }}>
        <h2>Book Appointment</h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="input-group">
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>Time</label>
            <select value={time} onChange={(e) => setTime(e.target.value)} required>
              <option value="">Select Time</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>2:00 PM</option>
              <option>3:00 PM</option>
            </select>
          </div>

          <div className="input-group">
            <label>Reason / Symptoms</label>
            <textarea
              placeholder="Reason / Symptoms"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="5"
            />
          </div>

          <div className="input-group">
            <label>Payment Method</label>
            <div style={{ display: "grid", gap: "12px" }}>
              {['Khalti', 'eSewa', 'Cash'].map((method) => (
                <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={payment === method}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>Consultation Fee</label>
            <p style={{ color: 'var(--on-surface-variant)' }}>Rs. 1000</p>
          </div>

          <div className="form-actions">
            <button className="button-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Booking..." : "Confirm Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookAppointment;
