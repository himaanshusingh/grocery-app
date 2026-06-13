import { useEffect, useState } from "react";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { useProductsStore } from "@/lib/store/products";
import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { FilterSheet } from "@/components/FilterSheet";
import { ProductCardSkeleton } from "@/components/SkeletonLoader";

const POPULAR_SEARCHES = ["Banana", "Apple", "Oil", "Salmon", "Milk", "Soda"];

export function Search() {
  const searchQuery = useProductsStore((s) => s.searchQuery);
  const setSearchQuery = useProductsStore((s) => s.setSearchQuery);
  const getFilteredProducts = useProductsStore((s) => s.getFilteredProducts);
  const resetFilters = useProductsStore((s) => s.resetFilters);
  const isLoading = useProductsStore((s) => s.isLoading);
  const triggerLoading = useProductsStore((s) => s.triggerLoading);

  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Debounced search trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localQuery);
      triggerLoading();
    }, 300); // 300ms debounce delay
    return () => clearTimeout(timer);
  }, [localQuery, setSearchQuery, triggerLoading]);

  const filteredProducts = getFilteredProducts();

  const handlePopularClick = (term: string) => {
    setLocalQuery(term);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-20 md:px-8 md:pb-12 animate-fade-in">
      {/* Search Input and Filter Trigger Header */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <SearchIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-brand-gray" />
          <input
            type="text"
            placeholder="Search Store"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            className="w-full rounded-2xl border-none bg-brand-light py-3.5 pr-4 pl-12 text-sm font-semibold outline-hidden focus:ring-1 focus:ring-primary"
          />
        </div>
        
        {/* Mobile filter toggle */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-100 bg-white text-brand-dark active:scale-95 transition-all md:hidden shrink-0"
        >
          <SlidersHorizontal className="h-5 w-5 text-primary" />
        </button>
      </div>

      {/* Popular search tags (if query is empty) */}
      {!localQuery && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-brand-gray uppercase tracking-wider mr-1">Popular:</span>
          {POPULAR_SEARCHES.map((term) => (
            <button
              key={term}
              onClick={() => handlePopularClick(term)}
              className="rounded-full bg-brand-light hover:bg-neutral-200 text-xs font-bold text-brand-dark px-4 py-1.5 transition-colors cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {/* Results grid */}
      <div className="mt-6 flex gap-8">
        {/* Desktop filter sidebar */}
        <div className="hidden md:block">
          <FilterSidebar />
        </div>

        {/* Product results grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div>
              <div className="mb-4 text-xs font-bold text-brand-gray uppercase tracking-wider">
                Showing {filteredProducts.length} Results
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-4xl">🔍</span>
              <h3 className="mt-4 text-lg font-bold text-brand-dark">No search results</h3>
              <p className="mt-1 text-sm text-brand-gray">We couldn't find anything matching "{localQuery}".</p>
              <button
                onClick={() => {
                  setLocalQuery("");
                  resetFilters();
                }}
                className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white hover:bg-primary-hover transition-all"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile overlay filter sheet */}
      <FilterSheet isOpen={mobileFilterOpen} onClose={() => setMobileFilterOpen(false)} />
    </div>
  );
}
export default Search;
