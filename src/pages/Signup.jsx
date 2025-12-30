// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../api/api";

export default function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (
      !form.fullName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      return setError("All fields are required");
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return setError("Invalid email format");
    }

    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    try {
      const data = await apiRequest("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
        }),
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
      <h2 className="text-xl font-semibold mb-4">Signup</h2>

      <input
        className="w-full p-2 border mb-2"
        placeholder="Full Name"
        value={form.fullName}
        onChange={(e) =>
          setForm({ ...form, fullName: e.target.value })
        }
      />

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

      <input
        className="w-full p-2 border mb-2"
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={(e) =>
          setForm({ ...form, confirmPassword: e.target.value })
        }
      />

      {error && (
        <p className="text-red-500 text-sm mb-2">
          {error}
        </p>
      )}

      <button
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>

      <p className="text-sm mt-2">
        Already have an account?{" "}
        <Link className="text-blue-600" to="/login">
          Login
        </Link>
      </p>
    </form>
  );
}
