import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import PublicLayout from "@/layouts/PublicLayout";
import { useAuthStore } from "@/store/authStore";

const Landing = lazy(() => import("./pages/Landing"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Testing = lazy(() => import("./pages/Testing"));
const Reports = lazy(() => import("./pages/Reports"));
const Payment = lazy(() => import("./pages/Payment"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const Login = lazy(() => import("./pages/AuthLogin"));
const Register = lazy(() => import("./pages/AuthRegister"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50">
    <div className="h-10 w-10 rounded-full border-[3px] border-primary/20 border-t-primary animate-spin" />
  </div>
);

const AppRoutes = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="/dev-dashboard" element={<Navigate to="/dashboard" replace />} />
        <Route path="/domain-test" element={<Navigate to="/testing" replace />} />
        <Route path="/api-test" element={<Navigate to="/testing" replace />} />
        <Route path="/frontend-test" element={<Navigate to="/testing" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AppRoutes />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
