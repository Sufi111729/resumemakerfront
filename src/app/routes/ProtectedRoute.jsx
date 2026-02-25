import { Navigate } from "react-router-dom";
import { authStore } from "../../state/authStore";

export function ProtectedRoute({ children }) {
  const { accessToken } = authStore();
  if (!accessToken) return <Navigate to="/login" replace />;
  return children;
}
