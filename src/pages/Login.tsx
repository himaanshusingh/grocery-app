import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthShell, CarrotLogo } from "@/components/AuthShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useAuthStore } from "@/lib/store/auth";

export function Login() {
  const navigate = useNavigate();
  const signIn = useAuthStore((s) => s.signIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    // Basic client validation
    if (!email || !email.includes("@")) {
      setErr("Enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setErr("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 650));
    signIn({
      email,
      username: email.split("@")[0],
    });
    setLoading(false);
    navigate("/location");
  };

  return (
    <AuthShell>
      <div className="flex justify-center pt-6">
        <CarrotLogo size={40} />
      </div>
      <div className="mt-12">
        <h1 className="text-3xl font-bold text-neutral-900">Logging In</h1>
        <p className="mt-2 text-sm text-brand-gray font-semibold">Enter your email and password</p>
      </div>

      <form onSubmit={submit} className="mt-8 space-y-6">
        <div>
          <label className="block text-xs font-bold text-brand-gray uppercase tracking-wider">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full border-b border-neutral-300 bg-transparent py-2 text-base font-semibold text-neutral-900 outline-hidden focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-brand-gray uppercase tracking-wider">Password</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full border-b border-neutral-300 bg-transparent py-2 pr-10 text-base font-semibold text-neutral-900 outline-hidden focus:border-primary"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-0 top-3 text-lg cursor-pointer"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? "🙈" : "👁"}
            </button>
          </div>
          <div className="mt-2 text-right">
            <button type="button" className="text-xs font-semibold text-brand-gray hover:text-primary transition-colors">
              Forgot Password?
            </button>
          </div>
        </div>

        {err && <p className="text-xs font-semibold text-red-500">{err}</p>}

        <PrimaryButton type="submit" loading={loading}>
          Log In
        </PrimaryButton>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-600">
        Don't have an account?{" "}
        <Link to="/signup" className="font-bold text-primary hover:underline">
          Sign Up
        </Link>
      </p>
    </AuthShell>
  );
}
export default Login;
