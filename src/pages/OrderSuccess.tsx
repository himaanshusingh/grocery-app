import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center animate-fade-in max-w-md mx-auto">
      <div className="flex h-36 w-36 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 animate-bounce">
        <CheckCircle2 className="h-20 w-20 stroke-[1.5]" />
      </div>

      <h1 className="mt-8 text-2xl font-extrabold text-brand-dark md:text-3xl leading-tight">
        Your Order has<br />been accepted
      </h1>
      
      <p className="mt-4 text-sm font-semibold text-brand-gray leading-relaxed">
        Your items have been placed and are on their way to being prepared for delivery.
      </p>

      <div className="mt-12 w-full space-y-3.5">
        <button
          onClick={() => navigate("/home")}
          className="w-full rounded-2xl bg-primary py-4.5 text-base font-semibold text-white shadow-md hover:bg-primary-hover active:scale-98 transition-all cursor-pointer"
        >
          Track Order
        </button>
        <button
          onClick={() => navigate("/home")}
          className="w-full rounded-2xl bg-transparent py-4 text-base font-bold text-brand-dark hover:bg-neutral-50 active:scale-98 transition-all cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
export default OrderSuccess;
