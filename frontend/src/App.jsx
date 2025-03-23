import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectManagement from "./pages/ProjectManagement";
import WorkSubmission from "./pages/WorkSubmission";
import Payment from "./pages/Payment";
import Disputes from "./pages/Disputes";
import { AuthProvider } from "./context/AuthContext";
import "./style.css";
import React from "react";





function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />  {/* ✅ Navbar is always visible */}
        <div className="container">
          <Routes>
        
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<ProjectManagement />} />
            <Route path="/work" element={<WorkSubmission />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/disputes" element={<Disputes />} />
          </Routes>
        </div>
      </Router>
      <Toaster />
    </AuthProvider>

    // <Router>
    //   <Navbar /> {/* This ensures progress tracker is always visible */}
    //   <Routes>
       
    //   </Routes>
    // </Router>
  );
};


export default App;