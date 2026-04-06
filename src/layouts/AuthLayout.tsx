import { Outlet } from "react-router-dom";

const AuthLayout = () => (
  <div className="app-layout flex min-h-screen items-center justify-center px-4 py-10">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.08),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.08),transparent_22%)]" />
    <div className="relative w-full max-w-md">
      <Outlet />
    </div>
  </div>
);

export default AuthLayout;
