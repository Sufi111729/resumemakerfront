import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function RoleGuard({ allow = [], children }) {
  const role = useAuthStore((s) => s.role);
  if (!role || !allow.includes(role)) return <Navigate to="/admin/login" replace />;
  return children;
}
