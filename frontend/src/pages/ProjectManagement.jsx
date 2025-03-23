import React, { useState, useEffect } from "react";
import axios from "axios";

import'./Project.css';

function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");

  // Optional: Fetch existing projects when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/projects");
        // Assuming the response contains an array of projects
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    // fetchProjects();
    // const fetchProjects = async () => {
    //   try {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //       console.error('No token found. Please log in.');
    //       return;
    //     }
    
    //     const response = await axios.get("http://localhost:3000/api/projects", {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       }
    //     });
    //     setProjects(response.data.projects);
    //   } catch (error) {
    //     console.error("Error fetching projects", error.response?.data || error.message);
    //   }
    // };
  }
  , []);

  // const createProject = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:3000/api/projects", { title });
  //     // Append the new project to the existing list
  //     // Assuming the backend returns the created project as response.data.project
  //     setProjects([...projects, response.data.project]);
  //     setTitle(""); // Clear the input
  //   } catch (error) {
  //     console.error("Error creating project", error);
  //   }
  // };
  const createProject = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }
  
      const response = await axios.post("http://localhost:3000/api/projects", 
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
  
      setProjects([...projects, response.data.project]);
      setTitle(""); // Clear the input
      console.log("Project created successfully");
    } catch (error) {
      console.error("Error creating project", error.response?.data || error.message);
    }
  };
  

  return (
    <div className="container">
      <h2>Project Management</h2>
      <div className="create-project">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
        <button onClick={createProject} className="btn">
          Create Project
        </button>
      </div>
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectManagement;