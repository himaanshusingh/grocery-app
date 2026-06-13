import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#53B175] text-white">
      <div className="flex items-center gap-3 animate-fade-in">
        {/* Nectar white logo */}
        <svg width={60} height={60} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20 56 L44 32 L32 20 Z" fill="#ffffff" />
          <path
            d="M32 20 c0-6 4-10 8-10 c-1 4 -2 7 -5 9 c4-2 8 0 9 4 c-4 1 -7 0 -10-3 c2 4 0 8 -4 9 z"
            fill="#ffffff"
            opacity="0.9"
          />
        </svg>
        <span className="text-5xl font-bold tracking-tight">nectar</span>
      </div>
      <p className="mt-2 text-xs tracking-[0.4em] uppercase opacity-90 animate-fade-in">
        online groceries
      </p>
    </div>
  );
}
export default Splash;
