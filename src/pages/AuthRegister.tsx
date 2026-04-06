import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import BrandMark from "@/components/BrandMark";
import PageTransition from "@/components/PageTransition";
import { useAuthStore } from "@/store/authStore";

const AuthRegister = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await register(name, email, password);
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <PageTransition>
      <div className="app-card p-8 sm:p-10">
        <BrandMark className="justify-center sm:justify-start" />
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-slate-900">Create your account</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Start with one free test, then upgrade to Pro when your team needs higher volume and reports.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              placeholder="Alex Morgan"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Work email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              placeholder="alex@company.com"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              placeholder="Create password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have access?{" "}
          <Link to="/login" className="font-semibold text-primary transition hover:text-primary/80">
            Sign in
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default AuthRegister;
