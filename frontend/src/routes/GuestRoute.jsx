import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function GuestRoute({ children }) {
  const { user, loading } = useAuthStore();

  if (loading) return <p>Loading...</p>;

  if (user) return <Navigate to="/dashboard" replace />;

  return children;
}
