import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";

const NotFound = () => (
  <PageTransition>
    <div className="app-layout flex min-h-screen items-center justify-center px-4">
      <div className="app-card max-w-lg p-10 text-center">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">404</div>
        <h1 className="mt-4 text-4xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-3 text-sm leading-7 text-slate-500">
          The page you requested is not available in this workspace. Return to the dashboard or head back to the home page.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/dashboard" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white">
            Go to Dashboard
          </Link>
          <Link to="/" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  </PageTransition>
);

export default NotFound;
