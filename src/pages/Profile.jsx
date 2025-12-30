import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    email: "",
    fullName: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch current user
  useEffect(() => {
    apiRequest("/user/me")
      .then((data) => {
        setUser(data);
        setForm({
          email: data.email,
          fullName: data.full_name,
        });
      })
      .catch((err) => {
        setError(err.message || "Failed to load profile");
      });
  }, []);

  // Save profile changes
  const saveProfile = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await apiRequest("/user/me", {
        method: "PUT",
        body: JSON.stringify({
          email: form.email,
          fullName: form.fullName,
        }),
      });

      setMessage("Profile updated successfully");
    } catch (err) {
      setError(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="p-4">Loading profile...</p>;
  }

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>

      {error && (
        <p className="text-red-600 mb-2">{error}</p>
      )}

      {message && (
        <p className="text-green-600 mb-2">{message}</p>
      )}

      <input
        type="text"
        className="w-full p-2 border mb-2"
        placeholder="Full Name"
        value={form.fullName}
        onChange={(e) =>
          setForm({ ...form, fullName: e.target.value })
        }
      />

      <input
        type="email"
        className="w-full p-2 border mb-4"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <button
        type="button"
        onClick={saveProfile}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
