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

    alert(
      `Payment Successful ✅

Method: ${method}

Transaction ID:
${txn}`
    );

    navigate("/appointments");
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "25px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2>Payment</h2>

      <hr />

      <h3>{doctor}</h3>

      <h2>Amount : Rs. {amount}</h2>

      <br />

      <label>
        <input
          type="radio"
          value="Khalti"
          checked={method === "Khalti"}
          onChange={(e) => setMethod(e.target.value)}
        />
        🟣 Khalti
      </label>

      <br />
      <br />

      <label>
        <input
          type="radio"
          value="eSewa"
          checked={method === "eSewa"}
          onChange={(e) => setMethod(e.target.value)}
        />
        🟢 eSewa
      </label>

      <br />
      <br />

      <label>
        <input
          type="radio"
          value="Cash"
          checked={method === "Cash"}
          onChange={(e) => setMethod(e.target.value)}
        />
        💵 Cash
      </label>

      <br />
      <br />

      <button
        onClick={payNow}
        style={{
          width: "100%",
          padding: "12px",
          background: "#0d6efd",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default Payment;