import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthShell, CarrotLogo } from "@/components/AuthShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useAuthStore } from "@/lib/store/auth";

export function SignUp() {
  const navigate = useNavigate();
  const signIn = useAuthStore((s) => s.signIn);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const emailOk = email.trim().includes("@") && email.trim().length > 4;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (username.trim().length < 3) {
      setErr("Username must be at least 3 characters");
      return;
    }
    if (!emailOk) {
      setErr("Enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setErr("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 650));
    signIn({
      username: username.trim(),
      email: email.trim(),
    });
    setLoading(false);
    navigate("/location");
  };

  return (
    <AuthShell>
      <div className="flex justify-center pt-6">
        <CarrotLogo size={40} />
      </div>
      
      <div className="mt-10">
        <h1 className="text-3xl font-bold text-neutral-900">Sign Up</h1>
        <p className="mt-2 text-sm text-brand-gray font-semibold">Enter your credentials to continue</p>
      </div>

      <form onSubmit={submit} className="mt-8 space-y-6">
        <div>
          <label className="block text-xs font-bold text-brand-gray uppercase tracking-wider">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1.5 w-full border-b border-neutral-300 bg-transparent py-2 text-base font-semibold text-neutral-900 outline-hidden focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-brand-gray uppercase tracking-wider">Email</label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full border-b border-neutral-300 bg-transparent py-2 pr-8 text-base font-semibold text-neutral-900 outline-hidden focus:border-primary"
            />
            {emailOk && (
              <span className="absolute right-0 top-3 text-primary font-bold" aria-hidden>
                ✓
              </span>
            )}
          </div>
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
        </div>

        <p className="text-xs font-medium text-brand-gray">
          By continuing you agree to our{" "}
          <span className="text-primary font-bold cursor-pointer hover:underline">Terms of Service</span> and{" "}
          <span className="text-primary font-bold cursor-pointer hover:underline">Privacy Policy</span>.
        </p>

        {err && <p className="text-xs font-semibold text-red-500">{err}</p>}

        <PrimaryButton type="submit" loading={loading}>
          Sign Up
        </PrimaryButton>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-600">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-primary hover:underline">
          Login
        </Link>
      </p>
    </AuthShell>
  );
}
export default SignUp;
