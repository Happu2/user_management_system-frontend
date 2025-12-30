// src/pages/AdminUsers.jsx
import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiRequest(`/admin/users?page=${page}`);
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const toggleStatus = async (user) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${
        user.status === "active" ? "deactivate" : "activate"
      } this user?`
    );

    if (!confirmAction) return;

    try {
      await apiRequest(`/admin/users/${user.id}/status`, {
        method: "PATCH",
      });

      setMessage("User status updated successfully");
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>

      {message && (
        <p className="text-green-600 mb-2">{message}</p>
      )}
      {error && (
        <p className="text-red-600 mb-2">{error}</p>
      )}

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Full Name</th>
              <th className="border p-2 text-left">Role</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.full_name}</td>
                  <td className="border p-2">{user.role}</td>
                  <td className="border p-2">
                    {user.status}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => toggleStatus(user)}
                      className={`px-3 py-1 rounded text-white ${
                        user.status === "active"
                          ? "bg-red-600"
                          : "bg-green-600"
                      }`}
                    >
                      {user.status === "active"
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-4 py-2">Page {page}</span>

        <button
          disabled={users.length < 10}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
