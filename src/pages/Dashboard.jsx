import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    apiRequest("/user/me").then(setUser);
  }, []);

  if (!user) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">
        Welcome, {user.full_name}
      </h1>

      <p className="mb-4">
        Role: <span className="font-medium">{user.role}</span>
      </p>

      <div className="space-x-4">
        <Link
          to="/profile"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Profile
        </Link>

        {user.role === "admin" && (
          <Link
            to="/admin/users"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Admin Panel
          </Link>
        )}
      </div>
    </div>
  );
}
