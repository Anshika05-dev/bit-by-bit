import React, { useState } from "react";
import { Steps } from "antd";
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from "@ant-design/icons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./dashboard.css";

const Dashboard = () => {
  // Progress state: update this value via the slider
  const [progress, setProgress] = useState(75);

  return (
    <div className="dashboard-container">
      <Steps current={2} className="custom-steps">
        <Steps.Step icon={<UserOutlined />} title="Login" />
        <Steps.Step icon={<SolutionOutlined />} title="Working" />
        <Steps.Step icon={<LoadingOutlined />} title="Pay" />
        <Steps.Step icon={<SmileOutlined />} title="Done" />
      </Steps>

      <div className="dashboard-content">
        <h2></h2>
        <p></p>
        <div className="progress-circle">
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            styles={buildStyles({
              textColor: "#1e90ff",    // Dodger Blue for text
              pathColor: "#1e90ff",    // Dodger Blue for the progress path
              trailColor: "#d6d6d6"    // Light grey for the trail
            })}
          />
        </div>
        <div className="progress-input">
          <label htmlFor="progressRange">Update Progress:</label>
          <input 
            type="range" 
            id="progressRange" 
            min="0" 
            max="100" 
            value={progress} 
            onChange={(e) => setProgress(Number(e.target.value))}
          />
          <span className="progress-value">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;