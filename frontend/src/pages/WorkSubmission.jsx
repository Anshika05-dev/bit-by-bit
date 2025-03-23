import { useState } from "react";
import axios from "axios";
import "../style.css";
import "./WorkSubmission.css";

function WorkSubmission() {
  const [milestoneId, setMilestoneId] = useState("");
  const [work, setWork] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle file selection and create a preview URL
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setScreenshot(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitWork = async () => {
    try {
      const formData = new FormData();
      formData.append("milestoneId", milestoneId);
      formData.append("work", work);
      if (screenshot) {
        formData.append("screenshot", screenshot);
      }

      await axios.post("http://localhost:3000/api/work/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Work submitted successfully!");
      // Optionally, clear the form
      setMilestoneId("");
      setWork("");
      setScreenshot(null);
      setPreview(null);
    } catch (error) {
      console.error("Error submitting work", error);
    }
  };

  return (
    <div className="container">
      <h2>Submit Work</h2>
      <input
        type="text"
        placeholder="Milestone ID"
        value={milestoneId}
        onChange={(e) => setMilestoneId(e.target.value)}
        className="input"
      />
      <textarea
        placeholder="Work Description"
        value={work}
        onChange={(e) => setWork(e.target.value)}
        className="textarea"
      />
      <input
        type="text"
        placeholder="Link"
        value={milestoneId}
        onChange={(e) => setMilestoneId(e.target.value)}
        className="input"
      />
      {preview && (
        <div className="preview-container">
          <img src={preview} alt="Screenshot Preview" className="preview" />
        </div>
      )}
      <button onClick={submitWork} className="btn">
        Submit
      </button>
    </div>
  );
}

export default WorkSubmission;