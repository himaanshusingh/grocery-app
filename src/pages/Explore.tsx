import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { CATEGORIES } from "@/lib/mockData";
import { useProductsStore } from "@/lib/store/products";

export function Explore() {
  const navigate = useNavigate();
  const setSearchQuery = useProductsStore((s) => s.setSearchQuery);

  const handleSearchFocus = () => {
    setSearchQuery("");
    navigate("/search");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 pb-20 md:px-8 md:pb-12 animate-fade-in">
      <h1 className="hidden md:block text-2xl font-bold text-brand-dark text-center mb-6">
        Find Products
      </h1>

      {/* Search Bar Redirect */}
      <div className="relative mb-6">
        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-brand-gray" />
        <input
          type="text"
          placeholder="Search Store"
          onFocus={handleSearchFocus}
          readOnly
          className="w-full rounded-2xl border-none bg-brand-light py-3.5 pr-4 pl-12 text-sm font-semibold outline-hidden focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => navigate(`/explore/${category.id}`)}
            className={`flex flex-col items-center justify-center rounded-3xl border p-5 shadow-2xs hover:shadow-xs transition-all hover:scale-103 cursor-pointer ${category.bgColor} ${category.borderColor} h-44`}
          >
            <div className="flex h-20 w-full items-center justify-center">
              <img
                src={category.image}
                alt={category.name}
                className="h-16 w-auto object-contain"
              />
            </div>
            <h2 className={`mt-3 text-center text-sm font-bold leading-tight ${category.textColor}`}>
              {category.name}
            </h2>
          </button>
        ))}
      </div>
    </div>
  );
}
export default Explore;
