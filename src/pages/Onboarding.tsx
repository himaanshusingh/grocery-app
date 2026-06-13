import { useNavigate } from "react-router-dom";

export function Onboarding() {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-end px-6 pb-12 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.85)), url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80')`,
      }}
    >
      <div className="flex flex-col items-center text-center max-w-md animate-fade-in">
        {/* Nectar logo white */}
        <svg width={48} height={48} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
          <path d="M20 56 L44 32 L32 20 Z" fill="#ffffff" />
          <path
            d="M32 20 c0-6 4-10 8-10 c-1 4 -2 7 -5 9 c4-2 8 0 9 4 c-4 1 -7 0 -10-3 c2 4 0 8 -4 9 z"
            fill="#ffffff"
            opacity="0.9"
          />
        </svg>

        <h1 className="text-4xl font-bold leading-tight text-white">
          Welcome<br />to our store
        </h1>
        
        <p className="mt-3 text-sm font-medium text-white/75">
          Get your groceries in as fast as one hour
        </p>

        <button
          onClick={() => navigate("/signin")}
          className="mt-10 w-full rounded-2xl bg-primary py-4.5 text-base font-semibold text-white shadow-lg hover:bg-primary-hover active:scale-98 transition-all"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
export default Onboarding;
