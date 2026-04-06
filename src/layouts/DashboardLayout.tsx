import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardTopbar from "@/components/DashboardTopbar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-layout min-h-screen lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      {sidebarOpen ? (
        <div className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[2px] lg:hidden">
          <div className="h-full w-[280px] max-w-[85vw]">
            <DashboardSidebar mobile onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="min-w-0">
        <DashboardTopbar onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
