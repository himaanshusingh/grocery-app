import { Link, useLocation, useNavigate } from "react-router-dom";
import { MapPin, Search, Heart, ShoppingBag, User, LogOut, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth";
import { useCartStore, getCartTotalItems } from "@/lib/store/cart";
import { useFavoritesStore } from "@/lib/store/favorites";
import { useProductsStore } from "@/lib/store/products";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const items = useCartStore((s) => s.items);
  const favItems = useFavoritesStore((s) => s.items);
  const searchQuery = useProductsStore((s) => s.searchQuery);
  const setSearchQuery = useProductsStore((s) => s.setSearchQuery);

  const totalCartItems = getCartTotalItems(items);
  const totalFavItems = favItems.length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (location.pathname !== "/search") {
      navigate("/search");
    }
  };

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  // Determine current page for mobile titles
  const isHome = location.pathname === "/home";
  const isExplore = location.pathname.startsWith("/explore");
  const isCart = location.pathname === "/cart";
  const isFavorites = location.pathname === "/favorites";
  const isSearch = location.pathname === "/search";
  const isProductDetail = location.pathname.startsWith("/product/");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-100 bg-white/95 backdrop-blur-md">
      {/* Desktop Navigation */}
      <div className="mx-auto hidden max-w-7xl items-center justify-between px-4 py-4 md:flex lg:px-8">
        <Link to="/home" className="flex items-center gap-2">
          {/* Nectar Green Logo */}
          <svg width={32} height={32} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 56 L44 32 L32 20 Z" fill="#53B175" />
            <path
              d="M32 20 c0-6 4-10 8-10 c-1 4 -2 7 -5 9 c4-2 8 0 9 4 c-4 1 -7 0 -10-3 c2 4 0 8 -4 9 z"
              fill="#53B175"
              opacity="0.9"
            />
          </svg>
          <span className="text-2xl font-bold tracking-tight text-primary">nectar</span>
        </Link>

        {/* Navigation links */}
        <nav className="flex items-center gap-8 text-base font-semibold text-brand-dark">
          <Link
            to="/home"
            className={`transition-colors hover:text-primary ${
              isHome ? "text-primary border-b-2 border-primary pb-1" : ""
            }`}
          >
            Shop
          </Link>
          <Link
            to="/explore"
            className={`transition-colors hover:text-primary ${
              isExplore ? "text-primary border-b-2 border-primary pb-1" : ""
            }`}
          >
            Explore
          </Link>
          <Link
            to="/favorites"
            className={`transition-colors hover:text-primary ${
              isFavorites ? "text-primary border-b-2 border-primary pb-1" : ""
            }`}
          >
            Favorites
          </Link>
          <Link
            to="/cart"
            className={`transition-colors hover:text-primary ${
              isCart ? "text-primary border-b-2 border-primary pb-1" : ""
            }`}
          >
            Cart
          </Link>
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-6">
          {/* Desktop Search */}
          <div className="relative w-64 lg:w-80">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-brand-gray" />
            <input
              type="text"
              placeholder="Search store..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-xl border-none bg-brand-light py-2.5 pr-4 pl-10 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Location details */}
          <Link to="/location" className="flex items-center gap-1.5 text-sm font-semibold text-brand-dark hover:text-primary">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{user?.area ? `${user.zone}, ${user.area}` : "Select Location"}</span>
            <ChevronDown className="h-3 w-3" />
          </Link>

          {/* Favorites shortcut */}
          <Link to="/favorites" className="relative p-1.5 text-brand-dark hover:text-primary">
            <Heart className="h-6 w-6" />
            {totalFavItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {totalFavItems}
              </span>
            )}
          </Link>

          {/* Cart shortcut */}
          <Link to="/cart" className="relative p-1.5 text-brand-dark hover:text-primary">
            <ShoppingBag className="h-6 w-6" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {totalCartItems}
              </span>
            )}
          </Link>

          {/* User Info / Logout */}
          <div className="flex items-center gap-2 border-l border-neutral-200 pl-4">
            <div className="flex flex-col text-right">
              <span className="text-xs font-semibold text-brand-gray">Hello,</span>
              <span className="text-sm font-bold text-brand-dark max-w-[100px] truncate">
                {user?.username || "Guest"}
              </span>
            </div>
            {user ? (
              <button
                onClick={handleLogout}
                className="rounded-full p-2 text-brand-gray hover:bg-neutral-100 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            ) : (
              <Link to="/login" className="rounded-full p-2 text-brand-gray hover:bg-neutral-100 hover:text-primary transition-colors">
                <User className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Top Header (differs per page context) */}
      <div className="flex h-14 items-center justify-between px-4 md:hidden">
        {isHome ? (
          <div className="flex w-full flex-col items-center justify-center py-1">
            <div className="flex items-center gap-1.5 text-sm font-bold text-brand-dark">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{user?.area ? `${user.area}, ${user.zone}` : "Select Location"}</span>
            </div>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between">
            {location.pathname !== "/" && location.pathname !== "/onboarding" && (
              <button onClick={() => navigate(-1)} className="p-1 text-brand-dark active:opacity-60">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
            )}

            <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-brand-dark capitalize">
              {isCart
                ? "My Cart"
                : isFavorites
                ? "Favorites"
                : isExplore
                ? "Find Products"
                : isSearch
                ? "Search"
                : isProductDetail
                ? "Product Details"
                : "Nectar"}
            </h1>

            {/* Empty element to maintain spacing if no back button */}
            <div className="w-8"></div>
          </div>
        )}
      </div>
    </header>
  );
}
