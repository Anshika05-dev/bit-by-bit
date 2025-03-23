import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", role: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ Use navigate for redirection

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", formData);
      localStorage.setItem("token", response.data.token); // ✅ Store token after registration
      navigate("/dashboard"); // ✅ Redirect to Dashboard after registration
    } catch (err) {
      setError("Registration failed! Try again.");
    }
  };
  

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
        <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <input type="text" placeholder="Role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required />
        <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;