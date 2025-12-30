import jwtDecode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let user = null;
  if (token) {
    try {
      user = jwtDecode(token);
    } catch {
      user = null;
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>

        {/* ✅ ADMIN LINK */}
        {user?.role === "admin" && (
          <Link to="/admin/users">Users</Link>
        )}
      </div>

      {user && (
        <button onClick={logout}>Logout</button>
      )}
    </nav>
  );
}
