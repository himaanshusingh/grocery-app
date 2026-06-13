import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

export function OrderFailed() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center animate-fade-in max-w-md mx-auto">
      <div className="flex h-36 w-36 items-center justify-center rounded-full bg-red-50 text-red-500 animate-pulse">
        <XCircle className="h-20 w-20 stroke-[1.5]" />
      </div>

      <h1 className="mt-8 text-2xl font-extrabold text-brand-dark md:text-3xl leading-tight">
        Oops! Order Failed
      </h1>
      
      <p className="mt-4 text-sm font-semibold text-brand-gray leading-relaxed">
        Something went wrong on our end or with your promo code failure configuration. Please try again.
      </p>

      <div className="mt-12 w-full space-y-3.5">
        <button
          onClick={() => navigate("/cart")}
          className="w-full rounded-2xl bg-neutral-900 py-4.5 text-base font-semibold text-white shadow-md hover:bg-neutral-800 active:scale-98 transition-all cursor-pointer"
        >
          Please Try Again
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
export default OrderFailed;
