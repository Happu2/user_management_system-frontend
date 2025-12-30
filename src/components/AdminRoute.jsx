import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = jwtDecode(token);

    if (user.role !== "admin") {
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  } catch (err) {
    return <Navigate to="/login" replace />;
  }
}
