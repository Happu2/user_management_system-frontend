// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../api/api";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      return setError("Email and password are required");
    }

    setLoading(true);
    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-6 rounded shadow w-80"
    >
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      <input
        className="w-full p-2 border mb-2"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        className="w-full p-2 border mb-2"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      {error && (
        <p className="text-red-500 text-sm mb-2">
          {error}
        </p>
      )}

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-sm mt-2">
        Don’t have an account?{" "}
        <Link className="text-blue-600" to="/signup">
          Signup
        </Link>
      </p>
    </form>
  );
}
