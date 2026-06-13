import { X } from "lucide-react";
import { useProductsStore } from "@/lib/store/products";

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterSheet({ isOpen, onClose }: FilterSheetProps) {
  const products = useProductsStore((s) => s.products);
  const filters = useProductsStore((s) => s.filters);
  const setFilters = useProductsStore((s) => s.setFilters);
  const resetFilters = useProductsStore((s) => s.resetFilters);

  if (!isOpen) return null;

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

  const priceRanges = [
    { label: "All Prices", min: 0, max: 50 },
    { label: "Under $5", min: 0, max: 5 },
    { label: "$5 to $15", min: 5, max: 15 },
    { label: "$15 to $30", min: 15, max: 30 },
    { label: "Over $30", min: 30, max: 50 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs md:hidden">
      {/* Background overlay click-to-close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Sheet Content */}
      <div className="relative z-10 w-full rounded-t-3xl bg-white p-6 shadow-xl max-h-[85vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <button
            onClick={() => {
              resetFilters();
            }}
            className="text-sm font-semibold text-brand-dark opacity-60"
          >
            Clear All
          </button>
          <h2 className="text-lg font-bold text-brand-dark">Filter</h2>
          <button onClick={onClose} className="p-1 rounded-full bg-brand-light">
            <X className="h-5 w-5 text-brand-dark" />
          </button>
        </div>

        {/* Brand Section */}
        <div className="mt-6">
          <h3 className="text-base font-bold text-brand-dark">Brands</h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {uniqueBrands.map((brand) => {
              const isChecked = filters.brands.includes(brand);
              return (
                <button
                  key={brand}
                  onClick={() => handleBrandChange(brand, !isChecked)}
                  className={`flex items-center justify-center rounded-xl border py-2.5 px-3 text-xs font-semibold transition-all ${
                    isChecked
                      ? "border-primary bg-emerald-50/50 text-primary"
                      : "border-neutral-100 bg-neutral-50/50 text-brand-dark hover:border-neutral-200"
                  }`}
                >
                  {brand}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Section */}
        <div className="mt-8">
          <h3 className="text-base font-bold text-brand-dark">Price Range</h3>
          <div className="mt-3 space-y-3">
            {priceRanges.map((range) => {
              const isSelected =
                filters.priceRange[0] === range.min &&
                filters.priceRange[1] === range.max;
              return (
                <button
                  key={range.label}
                  onClick={() => handlePriceRangeChange(range.min, range.max)}
                  className={`flex w-full items-center justify-between rounded-xl border py-3 px-4 text-sm font-semibold transition-all ${
                    isSelected
                      ? "border-primary bg-emerald-50/50 text-primary"
                      : "border-neutral-100 bg-neutral-50/50 text-brand-dark hover:border-neutral-200"
                  }`}
                >
                  <span>{range.label}</span>
                  <div
                    className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center ${
                      isSelected ? "border-primary bg-primary" : "border-neutral-300 bg-white"
                    }`}
                  >
                    {isSelected && <div className="h-2 w-2 rounded-full bg-white"></div>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Apply Button */}
        <div className="mt-8">
          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-primary py-4 text-base font-semibold text-white shadow-md active:bg-primary-hover active:scale-98 transition-all"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
}
