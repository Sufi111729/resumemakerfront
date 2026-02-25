import { Navigate } from "react-router-dom";
import { authStore } from "../../state/authStore";

export function AdminRoute({ children }) {
  const { accessToken, user } = authStore();
  if (!accessToken) return <Navigate to="/admin/login" replace />;
  if (user?.role !== "ADMIN") return <Navigate to="/admin/login" replace />;
  return children;
}
