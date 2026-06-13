import { Link, useLocation } from "react-router-dom";
import { Store, Search, ShoppingCart, Heart, User } from "lucide-react";
import { useCartStore, getCartTotalItems } from "@/lib/store/cart";
import { useFavoritesStore } from "@/lib/store/favorites";

export function BottomNav() {
  const location = useLocation();
  const items = useCartStore((s) => s.items);
  const favItems = useFavoritesStore((s) => s.items);

  const totalCartItems = getCartTotalItems(items);
  const totalFavItems = favItems.length;

  const isActive = (path: string) => {
    if (path === "/home") return location.pathname === "/home";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-40 border-t border-neutral-100 bg-white/95 py-2.5 backdrop-blur-md md:hidden shadow-lg rounded-t-2xl">
      <div className="flex items-center justify-around px-2">
        {/* Shop */}
        <Link
          to="/home"
          className={`flex flex-col items-center gap-1 text-xs font-semibold ${
            isActive("/home") ? "text-primary" : "text-brand-dark opacity-75 hover:opacity-100"
          }`}
        >
          <Store className="h-5.5 w-5.5" />
          <span>Shop</span>
        </Link>

        {/* Explore */}
        <Link
          to="/explore"
          className={`flex flex-col items-center gap-1 text-xs font-semibold ${
            isActive("/explore") ? "text-primary" : "text-brand-dark opacity-75 hover:opacity-100"
          }`}
        >
          <Search className="h-5.5 w-5.5" />
          <span>Explore</span>
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className={`relative flex flex-col items-center gap-1 text-xs font-semibold ${
            isActive("/cart") ? "text-primary" : "text-brand-dark opacity-75 hover:opacity-100"
          }`}
        >
          <ShoppingCart className="h-5.5 w-5.5" />
          {totalCartItems > 0 && (
            <span className="absolute -top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
              {totalCartItems}
            </span>
          )}
          <span>Cart</span>
        </Link>

        {/* Favourite */}
        <Link
          to="/favorites"
          className={`relative flex flex-col items-center gap-1 text-xs font-semibold ${
            isActive("/favorites") ? "text-primary" : "text-brand-dark opacity-75 hover:opacity-100"
          }`}
        >
          <Heart className="h-5.5 w-5.5" />
          {totalFavItems > 0 && (
            <span className="absolute -top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
              {totalFavItems}
            </span>
          )}
          <span>Favourite</span>
        </Link>

        {/* Account (Profile details / logout link) */}
        <Link
          to="/location"
          className={`flex flex-col items-center gap-1 text-xs font-semibold ${
            isActive("/location") ? "text-primary" : "text-brand-dark opacity-75 hover:opacity-100"
          }`}
        >
          <User className="h-5.5 w-5.5" />
          <span>Account</span>
        </Link>
      </div>
    </nav>
  );
}
