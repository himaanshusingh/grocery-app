import { useNavigate, Link } from "react-router-dom";

export function SignIn() {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-full flex flex-col justify-between overflow-hidden bg-white"
      style={{
        background:
          "radial-gradient(60% 40% at 15% 12%, rgba(252, 220, 200, 0.55), transparent 70%)," +
          "radial-gradient(50% 35% at 90% 8%, rgba(200, 235, 230, 0.65), transparent 70%)," +
          "radial-gradient(45% 35% at 85% 95%, rgba(255, 215, 220, 0.55), transparent 70%)," +
          "radial-gradient(45% 35% at 10% 92%, rgba(215, 220, 255, 0.55), transparent 70%)," +
          "#ffffff",
      }}
    >
      {/* Grocery Image container (exactly 38% viewport height, rounded bottom edge) */}
      <div className="w-full h-[38vh] overflow-hidden rounded-b-[36px] shadow-2xs shrink-0 relative">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80"
          alt="Fresh groceries"
          className="h-full w-full object-cover object-bottom"
        />
        {/* Subtle white bottom gradient mask */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/20 to-transparent"></div>
      </div>
      
      {/* Scroll-free content area */}
      <div className="flex-grow flex flex-col justify-between px-6 pb-8 pt-5 max-w-md mx-auto w-full overflow-hidden">
        {/* Title and Phone trigger */}
        <div className="space-y-4">
          <h1 className="text-2xl font-extrabold leading-snug text-neutral-900">
            Get your groceries<br />with nectar
          </h1>

          <button
            onClick={() => navigate("/number")}
            className="w-full flex items-center gap-4 border-b border-neutral-200 py-3.5 text-left text-neutral-800 focus:outline-hidden cursor-pointer hover:border-primary transition-colors"
          >
            <span className="text-xl">🌐</span>
            <span className="text-base font-bold text-neutral-800">+880</span>
          </button>
        </div>

        {/* Social connections and alternative login */}
        <div className="space-y-4">
          <p className="text-center text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Or connect with social media
          </p>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/location")}
              className="flex w-full items-center justify-center gap-4 rounded-2xl py-4 text-sm font-bold text-white cursor-pointer active:scale-[0.99] transition-transform shadow-xs"
              style={{ backgroundColor: "#5383EC" }}
            >
              <span className="text-base font-black">G</span>
              <span>Continue with Google</span>
            </button>
            
            <button
              onClick={() => navigate("/location")}
              className="flex w-full items-center justify-center gap-4 rounded-2xl py-4 text-sm font-bold text-white cursor-pointer active:scale-[0.99] transition-transform shadow-xs"
              style={{ backgroundColor: "#4A66AC" }}
            >
              <span className="text-base font-black">f</span>
              <span>Continue with Facebook</span>
            </button>
          </div>

          <p className="text-center text-sm text-neutral-600 font-semibold pt-1">
            Prefer email?{" "}
            <Link to="/login" className="font-bold text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignIn;
