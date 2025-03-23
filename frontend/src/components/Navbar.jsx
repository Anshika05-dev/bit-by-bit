import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication token
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-heading">Freelancer Management</div>
      <ul>
        <li><Link to="/dashboard">Progress</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/work">Work</Link></li>
        <li><Link to="/payment">Payment</Link></li>
        <li><Link to="/disputes">Disputes</Link></li>
        <li>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;