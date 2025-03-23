import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css';
import'../style.css';


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", formData);
      localStorage.setItem("token", response.data.token); // ✅ Save token in localStorage
      navigate("/dashboard"); // ✅ Redirect to Dashboard after login
    } catch (err) {
      setError("Login failed! Please check your credentials.");
    }
  };
 
  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};


//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleLogin}>
//         <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
//         <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

export default Login;