import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, CreditCard, MapPin, Tag, X } from "lucide-react";
import { useCartStore, getCartSubtotal } from "@/lib/store/cart";
import { useAuthStore } from "@/lib/store/auth";

export function Cart() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const isCheckingOut = useCartStore((s) => s.isCheckingOut);
  const promoCode = useCartStore((s) => s.promoCode);
  const discountPercentage = useCartStore((s) => s.discountPercentage);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const applyPromoCode = useCartStore((s) => s.applyPromoCode);
  const checkout = useCartStore((s) => s.checkout);
  const user = useAuthStore((s) => s.user);

  const [promoInput, setPromoInput] = useState("");
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isMobileCheckoutOpen, setIsMobileCheckoutOpen] = useState(false);

  const subtotal = getCartSubtotal(items);
  const deliveryFee = subtotal > 0 ? 2.0 : 0.0;
  const discount = (subtotal * discountPercentage) / 100;
  const total = subtotal + deliveryFee - discount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    
    const success = applyPromoCode(promoInput);
    if (success) {
      if (promoInput.toUpperCase() === "FAIL") {
        setPromoMessage({ text: "Demo Failure Mode Activated", isError: false });
      } else {
        setPromoMessage({ text: `Promo code applied: ${promoInput.toUpperCase()}!`, isError: false });
      }
    } else {
      setPromoMessage({ text: "Invalid promo code.", isError: true });
    }
  };

  const handlePlaceOrder = async () => {
    // If user is not logged in or doesn't have a zone, prompt location selection first
    if (!user || !user.zone || !user.area) {
      navigate("/location");
      return;
    }

    const success = await checkout();
    setIsMobileCheckoutOpen(false);
    if (success) {
      navigate("/order-success");
    } else {
      navigate("/order-failed");
    }
  };

  const renderCartItems = () => (
    <div className="space-y-4">
      {items.map(({ product, quantity }) => (
        <div
          key={product.id}
          className="flex items-center gap-4 border-b border-neutral-100 pb-4 last:border-b-0"
        >
          {/* Image */}
          <div
            onClick={() => navigate(`/product/${product.id}`)}
            className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white flex items-center justify-center p-2 cursor-pointer"
          >
            <img src={product.image} alt={product.name} className="h-full w-auto object-contain" />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h3
              onClick={() => navigate(`/product/${product.id}`)}
              className="text-sm font-bold text-brand-dark truncate cursor-pointer hover:text-primary transition-colors"
            >
              {product.name}
            </h3>
            <p className="text-xs text-brand-gray font-medium mt-0.5">{product.unit}</p>

            {/* Counter for mobile */}
            <div className="mt-3 flex items-center gap-3.5 md:hidden">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 active:scale-95"
              >
                <Minus className="h-4.5 w-4.5" />
              </button>
              <span className="text-sm font-bold text-brand-dark">{quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-200 text-primary active:scale-95"
              >
                <Plus className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Counter for desktop */}
          <div className="hidden md:flex items-center gap-3.5">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 active:scale-95 cursor-pointer hover:bg-neutral-50"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-sm font-bold text-brand-dark w-4 text-center">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 text-primary active:scale-95 cursor-pointer hover:bg-neutral-50"
            >
              <Plus className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Price and Delete */}
          <div className="flex flex-col items-end gap-3.5 pl-2">
            <span className="text-base font-bold text-brand-dark">
              ${(product.price * quantity).toFixed(2)}
            </span>
            <button
              onClick={() => removeItem(product.id)}
              className="text-neutral-400 hover:text-red-500 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCheckoutSummary = () => (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-xs space-y-6">
      <h2 className="text-lg font-bold text-brand-dark pb-2 border-b border-neutral-100">
        Checkout Details
      </h2>

      {/* Delivery Detail */}
      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="text-left">
            <h4 className="text-sm font-bold text-brand-dark">Delivery Address</h4>
            <p className="text-xs text-brand-gray mt-0.5">
              {user?.area ? `${user.area}, ${user.zone}` : "Select in next step"}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/location")}
          className="text-xs font-bold text-primary hover:underline cursor-pointer"
        >
          Change
        </button>
      </div>

      {/* Payment Detail */}
      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          <CreditCard className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-brand-dark">Payment Method</h4>
            <p className="text-xs text-brand-gray mt-0.5">Credit/Debit Card (Visa **** 1234)</p>
          </div>
        </div>
      </div>

      {/* Promo Code detail */}
      <div className="space-y-3">
        <div className="flex gap-2 items-center">
          <Tag className="h-5 w-5 text-primary" />
          <h4 className="text-sm font-bold text-brand-dark">Promo Code</h4>
        </div>
        <form onSubmit={handleApplyPromo} className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. NECTAR10, NECTAR20"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            disabled={isCheckingOut}
            className="flex-1 rounded-xl border border-neutral-200 px-3.5 py-2 text-xs font-semibold text-brand-dark outline-hidden focus:border-primary disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isCheckingOut}
            className="rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold text-white px-4 py-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            Apply
          </button>
        </form>
        {promoMessage && (
          <p
            className={`text-xs font-semibold ${
              promoMessage.isError ? "text-red-500" : "text-primary"
            }`}
          >
            {promoMessage.text}
          </p>
        )}
      </div>

      {/* Cost breakdown */}
      <div className="border-t border-neutral-100 pt-4 space-y-3.5">
        <div className="flex justify-between text-sm text-brand-gray font-semibold">
          <span>Subtotal</span>
          <span className="text-brand-dark font-bold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-brand-gray font-semibold">
          <span>Delivery Fee</span>
          <span className="text-brand-dark font-bold">${deliveryFee.toFixed(2)}</span>
        </div>
        {discountPercentage > 0 && (
          <div className="flex justify-between text-sm text-primary font-semibold">
            <span>Discount ({discountPercentage}%)</span>
            <span className="font-bold">-${discount.toFixed(2)}</span>
          </div>
        )}
        <hr className="border-neutral-100" />
        <div className="flex justify-between text-base text-brand-dark font-extrabold">
          <span>Total Cost</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        disabled={isCheckingOut}
        className="w-full rounded-2xl bg-primary py-4 text-base font-semibold text-white shadow-md cursor-pointer transition active:scale-99 hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isCheckingOut ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Processing Order...</span>
          </>
        ) : (
          <span>Place Order</span>
        )}
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-24 md:px-8 md:pb-12 animate-fade-in">
      <h1 className="hidden md:block text-2xl font-bold text-brand-dark mb-6 text-center">
        My Cart
      </h1>

      {items.length > 0 ? (
        /* Split Layout */
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          {/* Left Side: Items List */}
          <div className="flex-1 rounded-2xl border border-neutral-100 bg-white p-6 shadow-xs">
            {renderCartItems()}
          </div>

          {/* Right Side: Sticky Checkout sidebar (desktop only) */}
          <div className="hidden md:block md:w-80 lg:w-96 md:sticky md:top-24">
            {renderCheckoutSummary()}
          </div>

          {/* Mobile Bottom Fixed Action Bar */}
          <div className="fixed bottom-14 right-0 left-0 z-40 bg-white border-t border-neutral-100 p-4 shadow-lg md:hidden">
            <button
              onClick={() => setIsMobileCheckoutOpen(true)}
              className="w-full rounded-2xl bg-primary py-4 text-base font-semibold text-white shadow-md hover:bg-primary-hover active:scale-98 transition-all flex items-center justify-between px-6"
            >
              <span>Go to Checkout</span>
              <span className="bg-emerald-600/35 px-3 py-1 rounded-lg text-xs font-bold">
                ${total.toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-24 text-center max-w-sm mx-auto">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-50 text-5xl">
            🛒
          </div>
          <h2 className="mt-6 text-xl font-bold text-brand-dark">Your Cart is Empty</h2>
          <p className="mt-2 text-sm text-brand-gray font-medium">
            Explore our categories and add fresh groceries to your basket.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="mt-8 rounded-2xl bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-primary-hover active:scale-98 transition-all"
          >
            Shop Categories
          </button>
        </div>
      )}

      {/* Mobile Checkout Bottom Sheet Overlay */}
      {isMobileCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs md:hidden">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={() => setIsMobileCheckoutOpen(false)}></div>
          
          {/* Sheet */}
          <div className="relative z-10 w-full rounded-t-3xl bg-white p-6 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            {/* Header close button */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-brand-dark">Checkout</h3>
              <button
                onClick={() => setIsMobileCheckoutOpen(false)}
                className="p-1 rounded-full bg-brand-light"
              >
                <X className="h-5 w-5 text-brand-dark" />
              </button>
            </div>
            {renderCheckoutSummary()}
          </div>
        </div>
      )}
    </div>
  );
}
export default Cart;
