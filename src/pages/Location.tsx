import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthShell } from "@/components/AuthShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useAuthStore } from "@/lib/store/auth";

const ZONES = ["Banasree", "Dhanmondi", "Gulshan", "Mirpur", "Uttara"];
const AREAS: Record<string, string[]> = {
  Banasree: ["Block A", "Block B", "Block C", "Block D"],
  Dhanmondi: ["Road 27", "Road 11", "Road 5"],
  Gulshan: ["Gulshan 1", "Gulshan 2"],
  Mirpur: ["Mirpur 1", "Mirpur 10", "Mirpur 11"],
  Uttara: ["Sector 3", "Sector 7", "Sector 10"],
};

export function Location() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.updateUser);
  const signIn = useAuthStore((s) => s.signIn);

  const [zone, setZone] = useState(user?.zone ?? "Banasree");
  const [area, setArea] = useState(user?.area ?? "");
  const valid = !!zone && !!area;

  const submit = () => {
    if (!valid) return;
    if (!user) {
      signIn({ zone, area });
    } else {
      updateUser({ zone, area });
    }
    // Set default user name if they logged in via social / location selection directly
    if (user && !user.username) {
      updateUser({ username: "Guest User" });
    }
    navigate("/home");
  };

  return (
    <AuthShell>
      <Link to="/signin" aria-label="Back" className="text-3xl text-neutral-800 hover:text-primary transition-colors">
        ‹
      </Link>

      <div className="mt-10 flex justify-center">
        {/* Visual Map/Pin graphics */}
        <svg width={120} height={120} viewBox="0 0 120 120" aria-hidden="true">
          <ellipse cx="60" cy="92" rx="44" ry="8" fill="#dbe7f5" />
          <path d="M20 80 L60 50 L100 80 L60 92 Z" fill="#a3c5ee" />
          <path d="M40 70 L70 50 L80 60 L50 80 Z" fill="#7fb37a" />
          <circle cx="60" cy="42" r="18" fill="#53B175" />
          <circle cx="60" cy="42" r="6" fill="#ffffff" />
          <path d="M60 60 L52 50 L68 50 Z" fill="#53B175" />
        </svg>
      </div>

      <h1 className="mt-6 text-center text-2xl font-bold text-neutral-900">
        Select Your Location
      </h1>
      <p className="mt-2 text-center text-sm text-brand-gray font-medium">
        Switch on your location to stay in tune with what's happening in your area
      </p>

      <div className="mt-10 space-y-6">
        <div>
          <label className="block text-xs font-bold text-brand-gray uppercase tracking-wider">Your Zone</label>
          <select
            value={zone}
            onChange={(e) => {
              setZone(e.target.value);
              setArea("");
            }}
            className="mt-1.5 w-full border-b border-neutral-300 bg-transparent py-2 text-base font-semibold text-neutral-900 outline-hidden focus:border-primary"
          >
            {ZONES.map((z) => (
              <option key={z}>{z}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-bold text-brand-gray uppercase tracking-wider">Your Area</label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="mt-1.5 w-full border-b border-neutral-300 bg-transparent py-2 text-base font-semibold text-neutral-900 outline-hidden focus:border-primary"
          >
            <option value="">Select your area</option>
            {(AREAS[zone] ?? []).map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-auto pt-10">
        <PrimaryButton onClick={submit} disabled={!valid}>
          Submit
        </PrimaryButton>
      </div>
    </AuthShell>
  );
}
export default Location;
