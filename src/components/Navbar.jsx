import { jwtDecode } from "jwt-decode";

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        {user?.role === "admin" && <Link to="/admin/users">Users</Link>}
      </div>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
