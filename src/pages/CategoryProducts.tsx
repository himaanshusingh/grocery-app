import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { CATEGORIES } from "@/lib/mockData";
import { ProductCategory } from "@/lib/types";
import { useProductsStore } from "@/lib/store/products";
import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { FilterSheet } from "@/components/FilterSheet";
import { ProductCardSkeleton } from "@/components/SkeletonLoader";

export function CategoryProducts() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  
  const setSelectedCategory = useProductsStore((s) => s.setSelectedCategory);
  const getFilteredProducts = useProductsStore((s) => s.getFilteredProducts);
  const resetFilters = useProductsStore((s) => s.resetFilters);
  const isLoading = useProductsStore((s) => s.isLoading);
  const triggerLoading = useProductsStore((s) => s.triggerLoading);

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Validate and get current category info
  const categoryInfo = CATEGORIES.find((c) => c.id === category);
  
  useEffect(() => {
    if (!categoryInfo) {
      navigate("/explore");
      return;
    }

    setSelectedCategory(category as ProductCategory);
    triggerLoading();

    return () => {
      setSelectedCategory(null);
      resetFilters();
    };
  }, [category, categoryInfo, navigate, setSelectedCategory, resetFilters, triggerLoading]);

  if (!categoryInfo) return null;

  const filteredProducts = getFilteredProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-20 md:px-8 md:pb-12 animate-fade-in">
      {/* Category Header Banner */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/explore")}
            className="rounded-full p-1.5 text-brand-dark hover:bg-neutral-100 transition-colors"
            aria-label="Back to categories"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <h1 className="text-xl font-bold text-brand-dark md:text-2xl">
            {categoryInfo.name}
          </h1>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-neutral-100 p-2.5 text-sm font-semibold text-brand-dark hover:bg-neutral-50 active:scale-95 transition-all md:hidden"
        >
          <SlidersHorizontal className="h-4.5 w-4.5 text-primary" />
          <span>Filters</span>
        </button>
      </div>

      {/* Main Grid Section (responsive columns, sidebar layout on desktop) */}
      <div className="mt-6 flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <FilterSidebar />
        </div>

        {/* Product Grid Area */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-4xl">🛒</span>
              <h3 className="mt-4 text-lg font-bold text-brand-dark">No products found</h3>
              <p className="mt-1 text-sm text-brand-gray">Try adjusting your filters or search criteria.</p>
              <button
                onClick={resetFilters}
                className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white hover:bg-primary-hover transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Sheet Filter */}
      <FilterSheet isOpen={mobileFilterOpen} onClose={() => setMobileFilterOpen(false)} />
    </div>
  );
}
export default CategoryProducts;
