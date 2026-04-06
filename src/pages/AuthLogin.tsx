import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import BrandMark from "@/components/BrandMark";
import PageTransition from "@/components/PageTransition";
import { useAuthStore } from "@/store/authStore";

const AuthLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <PageTransition>
      <div className="app-card p-8 sm:p-10">
        <BrandMark className="justify-center sm:justify-start" />
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-slate-900">Sign in to your workspace</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Access your dashboard, run tests, and review activity from one secure admin panel.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Work email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              placeholder="team@company.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <Link to="/forgot-password" className="text-sm font-medium text-primary transition hover:text-primary/80">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          New to GuardSphere?{" "}
          <Link to="/register" className="font-semibold text-primary transition hover:text-primary/80">
            Create an account
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default AuthLogin;
