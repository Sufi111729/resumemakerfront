import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./features/landing/LandingPage";
import { LoginPage } from "./features/auth/LoginPage";
import { RegisterPage } from "./features/auth/RegisterPage";
import { ForgotPasswordPage } from "./features/auth/ForgotPasswordPage";
import { AppLayout } from "./app/layouts/AppLayout";
import { AuthLayout } from "./app/layouts/AuthLayout";
import { DashboardPage } from "./features/dashboard/DashboardPage";
import { ResumesPage } from "./features/resume/ResumesPage";
import { EditorPage } from "./features/resume/EditorPage";
import { TemplatesPage } from "./features/templates/TemplatesPage";
import { BillingPage } from "./features/billing/BillingPage";
import { SettingsPage } from "./features/settings/SettingsPage";
import { PublicResumePage } from "./features/resume/PublicResumePage";
import { ProtectedRoute } from "./app/routes/ProtectedRoute";
import { NotFoundPage } from "./features/NotFoundPage";
import { ToastStack } from "./components/ui/Toast";
import { AdminRoute } from "./app/routes/AdminRoute";
import { AdminLayout } from "./app/layouts/AdminLayout";
import { AdminLoginPage } from "./features/auth/AdminLoginPage";
import { AdminDashboardPage } from "./features/admin/dashboard/AdminDashboardPage";
import { AdminUsersPage } from "./features/admin/users/AdminUsersPage";
import { AdminTemplatesPage } from "./features/admin/templates/AdminTemplatesPage";
import { AdminPaymentsPage } from "./features/admin/payments/AdminPaymentsPage";
import { AdminExportsPage } from "./features/admin/exports/AdminExportsPage";
import { AdminAnalyticsPage } from "./features/admin/analytics/AdminAnalyticsPage";
import { AdminSettingsPage } from "./features/admin/settings/AdminSettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <ToastStack />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/r/:slug" element={<PublicResumePage />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="resumes" element={<ResumesPage />} />
          <Route path="resume/:id/editor" element={<EditorPage />} />
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="templates" element={<AdminTemplatesPage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
          <Route path="exports" element={<AdminExportsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
