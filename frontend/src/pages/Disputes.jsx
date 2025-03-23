import { useState } from "react";
import axios from "axios";
import "../style.css";
import'./Disputes.css';


function Disputes() {
  const [milestoneId, setMilestoneId] = useState("");
  const [reason, setReason] = useState("");
console.log(milestoneId)
  const raiseDispute = async () => {
    try {
      await axios.post("http://localhost:3000/api/dispute/raise", { milestoneId, reason });
      console.log(milestoneId)
      alert("Dispute raised successfully!");
    } catch (error) {
      console.error("Error raising dispute", error);
    }
  };

  return (
    <div className="container">
      <h2>Raise a Dispute</h2>
      <input type="text" placeholder="Milestone ID" value={milestoneId} onChange={(e) => setMilestoneId(e.target.value)} className="input" />
      <textarea placeholder="Dispute Reason" value={reason} onChange={(e) => setReason(e.target.value)} className="textarea" />
      <button onClick={raiseDispute} className="btn">Submit Dispute</button>
    </div>
  );
}

export default Disputes;