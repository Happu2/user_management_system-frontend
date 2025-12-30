import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    apiRequest("/user/me").then((data) => {
      setUser(data);
      setForm({
        email: data.email,
        fullName: data.full_name,
      });
    });
  }, []);

  const save = async () => {
    await apiRequest("/user/me", {
      method: "PUT",
      body: JSON.stringify(form),
    });
    setMsg("Profile updated successfully");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>

      <input
        className="w-full p-2 border mb-2"
        value={form.fullName}
        onChange={(e) =>
          setForm({ ...form, fullName: e.target.value })
        }
      />

      <input
        className="w-full p-2 border mb-2"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <button
        onClick={save}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>

      {msg && <p className="text-green-600 mt-2">{msg}</p>}
    </div>
  );
}
