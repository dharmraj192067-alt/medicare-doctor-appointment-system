import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [method, setMethod] = useState("Khalti");

  const amount = state?.fees || 1000;
  const doctor = state?.doctor || "Doctor";

  const payNow = () => {
    const txn = "TXN" + Math.floor(Math.random() * 1000000);

    navigate("/appointments", {
      state: {
        successMessage: `Payment successful! Transaction ID: ${txn}`,
      },
    });
  };

  return (
    <div className="container section">
      <div className="form-panel" style={{ maxWidth: "520px", margin: "0 auto" }}>
        <h2>Payment</h2>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--on-surface-variant)', marginBottom: '10px' }}>Doctor</p>
          <h3>{doctor}</h3>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--on-surface-variant)', marginBottom: '10px' }}>Amount</p>
          <h2>Rs. {amount}</h2>
        </div>

        <div className="input-group">
          <label>Payment Method</label>
          <div style={{ display: 'grid', gap: '14px' }}>
            {['Khalti', 'eSewa', 'Cash'].map((option) => (
              <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="radio" value={option} checked={method === option} onChange={(e) => setMethod(e.target.value)} />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button className="button-primary" type="button" onClick={payNow}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
