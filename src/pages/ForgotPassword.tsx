import { Link } from "react-router-dom";
import BrandMark from "@/components/BrandMark";
import PageTransition from "@/components/PageTransition";

const ForgotPassword = () => (
  <PageTransition>
    <div className="app-card p-8 sm:p-10">
      <BrandMark className="justify-center sm:justify-start" />
      <h1 className="mt-8 text-3xl font-bold text-slate-900">Reset your password</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        This demo uses local auth, so password recovery is represented as a simple placeholder flow.
      </p>

      <div className="mt-8 rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
        Contact your workspace admin or return to the sign-in page to continue with the demo account flow.
      </div>

      <Link
        to="/login"
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"
      >
        Back to Sign In
      </Link>
    </div>
  </PageTransition>
);

export default ForgotPassword;
