import React, { useState } from "react";
import axios from "axios";
import "./Payment.css";
import "../style.css";

function Payment() {
  const [milestoneId, setMilestoneId] = useState("");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);

  const depositPayment = async () => {
    try {
      await axios.post("http://localhost:5000/api/payment/escrow", { milestoneId, amount });
      setSuccess(true);
      // Clear the input fields if needed
      setMilestoneId("");
      setAmount("");
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error processing payment", error);
    }
  };

  return (
    <div className="container">
      <h2>Deposit Payment</h2>
      <input
        type="text"
        placeholder="Milestone ID"
        value={milestoneId}
        onChange={(e) => setMilestoneId(e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input"
      />
      <button onClick={depositPayment} className="btn">
        Deposit
      </button>
      {success && (
        <div className="success-message">
          &#10004; Payment successful!
        </div>
      )}
    </div>
  );
}

export default Payment;