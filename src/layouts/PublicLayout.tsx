import { Outlet } from "react-router-dom";
import MarketingFooter from "@/components/MarketingFooter";
import MarketingNavbar from "@/components/MarketingNavbar";

const PublicLayout = () => (
  <div className="app-layout">
    <MarketingNavbar />
    <main>
      <Outlet />
    </main>
    <MarketingFooter />
  </div>
);

export default PublicLayout;
