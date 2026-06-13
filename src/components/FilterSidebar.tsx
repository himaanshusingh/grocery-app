import { useProductsStore } from "@/lib/store/products";

export function FilterSidebar() {
  const products = useProductsStore((s) => s.products);
  const filters = useProductsStore((s) => s.filters);
  const setFilters = useProductsStore((s) => s.setFilters);
  const resetFilters = useProductsStore((s) => s.resetFilters);

  // Extract all unique brands dynamically
  const uniqueBrands = Array.from(
    new Set(products.map((p) => p.brand).filter(Boolean))
  ) as string[];

  const handleBrandChange = (brand: string, checked: boolean) => {
    const nextBrands = checked
      ? [...filters.brands, brand]
      : filters.brands.filter((b) => b !== brand);
    setFilters({ brands: nextBrands });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setFilters({ priceRange: [min, max] });
  };

  const priceRanges: { label: string; min: number; max: number }[] = [
    { label: "All Prices", min: 0, max: 50 },
    { label: "Under $5", min: 0, max: 5 },
    { label: "$5 to $15", min: 5, max: 15 },
    { label: "$15 to $30", min: 15, max: 30 },
    { label: "Over $30", min: 30, max: 50 },
  ];

  return (
    <aside className="w-64 shrink-0 rounded-2xl border border-neutral-100 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
        <h2 className="text-lg font-bold text-brand-dark">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Brand Filters */}
      <div className="mt-6">
        <h3 className="text-sm font-bold text-brand-dark">Brands</h3>
        <div className="mt-3 space-y-2">
          {uniqueBrands.map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={(e) => handleBrandChange(brand, e.target.checked)}
                className="h-4.5 w-4.5 rounded-sm border-neutral-300 text-primary focus:ring-primary accent-primary"
              />
              <span className="text-sm text-brand-dark font-medium">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filters */}
      <div className="mt-8">
        <h3 className="text-sm font-bold text-brand-dark">Price Range</h3>
        <div className="mt-3 space-y-2.5">
          {priceRanges.map((range) => {
            const isSelected =
              filters.priceRange[0] === range.min &&
              filters.priceRange[1] === range.max;
            return (
              <label key={range.label} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  checked={isSelected}
                  onChange={() => handlePriceRangeChange(range.min, range.max)}
                  className="h-4.5 w-4.5 border-neutral-300 text-primary focus:ring-primary accent-primary"
                />
                <span className="text-sm text-brand-dark font-medium">{range.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
