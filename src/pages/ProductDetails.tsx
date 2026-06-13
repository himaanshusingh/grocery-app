import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Plus, Minus, ChevronDown, ChevronUp, Star } from "lucide-react";
import { PRODUCTS } from "@/lib/mockData";
import { ProductCard } from "@/components/ProductCard";
import { useCartStore } from "@/lib/store/cart";
import { useFavoritesStore } from "@/lib/store/favorites";
import { ProductDetailsSkeleton } from "@/components/SkeletonLoader";

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const addItem = useCartStore((s) => s.addItem);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFav = useFavoritesStore((s) => s.isFavorite(id || ""));

  const [product, setProduct] = useState(() => PRODUCTS.find((p) => p.id === id));
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  // Accordion toggle states
  const [openDetail, setOpenDetail] = useState(true);
  const [openNutrition, setOpenNutrition] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);

  useEffect(() => {
    setLoading(true);
    const found = PRODUCTS.find((p) => p.id === id);
    if (!found) {
      navigate("/home");
      return;
    }
    setProduct(found);
    setQty(1);

    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [id, navigate]);

  if (loading || !product) {
    return <ProductDetailsSkeleton />;
  }

  // Related products (same category, excluding current product)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const increment = () => setQty((q) => q + 1);
  const decrement = () => setQty((q) => (q > 1 ? q - 1 : 1));

  const handleAddToBasket = () => {
    addItem(product, qty);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-20 md:px-8 md:pb-12 animate-fade-in">
      {/* Split layout: left column for image, right column for details */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        
        {/* Left Column - Product Image */}
        <div className="relative flex h-80 items-center justify-center rounded-3xl border border-neutral-100 bg-neutral-50/50 p-6 md:h-[450px]">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 rounded-full bg-white p-2 text-brand-dark shadow-sm hover:bg-neutral-100 transition-colors md:hidden"
            aria-label="Back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          
          <img
            src={product.image}
            alt={product.name}
            className="max-h-60 w-auto object-contain md:max-h-[350px]"
          />
        </div>

        {/* Right Column - Product Purchase Panel */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Title & Favorites toggle */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-brand-dark md:text-3xl">
                  {product.name}
                </h1>
                <p className="mt-1 text-sm font-semibold text-brand-gray">
                  {product.unit}
                </p>
              </div>
              <button
                onClick={() => toggleFavorite(product)}
                className="rounded-full bg-neutral-50 p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-all"
                aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  className={`h-6 w-6 transition-colors ${
                    isFav ? "fill-red-500 text-red-500" : "text-neutral-400"
                  }`}
                />
              </button>
            </div>

            {/* Quantity adjustment & Price */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-4.5">
                <button
                  onClick={decrement}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 text-neutral-500 active:scale-95 active:bg-neutral-50 transition-all cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="text-lg font-bold text-brand-dark w-6 text-center">
                  {qty}
                </span>
                <button
                  onClick={increment}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 text-primary active:scale-95 active:bg-neutral-50 transition-all cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <span className="text-2xl font-extrabold text-brand-dark">
                ${(product.price * qty).toFixed(2)}
              </span>
            </div>

            {/* Accordion / Collapsible items */}
            <div className="mt-8 border-t border-neutral-100 pt-2 space-y-4">
              
              {/* Product Detail */}
              <div className="border-b border-neutral-100 pb-4">
                <button
                  onClick={() => setOpenDetail(!openDetail)}
                  className="flex w-full items-center justify-between py-2 text-left text-base font-bold text-brand-dark"
                >
                  <span>Product Detail</span>
                  {openDetail ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                <div
                  className={`mt-2 text-sm leading-relaxed text-brand-gray font-medium transition-all duration-300 ${
                    openDetail ? "block opacity-100" : "hidden opacity-0"
                  }`}
                >
                  {product.description}
                </div>
              </div>

              {/* Nutrition */}
              <div className="border-b border-neutral-100 pb-4">
                <button
                  onClick={() => setOpenNutrition(!openNutrition)}
                  className="flex w-full items-center justify-between py-2 text-left text-base font-bold text-brand-dark"
                >
                  <span>Nutritions</span>
                  <div className="flex items-center gap-2">
                    {!openNutrition && product.nutritionPer100g && (
                      <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-brand-gray">
                        {product.nutritionPer100g.split(",")[0]}
                      </span>
                    )}
                    {openNutrition ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </button>
                <div
                  className={`mt-2 text-sm text-brand-gray font-medium transition-all duration-300 ${
                    openNutrition ? "block opacity-100" : "hidden opacity-0"
                  }`}
                >
                  {product.nutritionPer100g || "Nutrition info not available for this item."}
                </div>
              </div>

              {/* Review */}
              <div className="border-b border-neutral-100 pb-4">
                <button
                  onClick={() => setOpenReviews(!openReviews)}
                  className="flex w-full items-center justify-between py-2 text-left text-base font-bold text-brand-dark"
                >
                  <span>Review</span>
                  <div className="flex items-center gap-1 text-brand-orange">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating || 5)
                              ? "fill-amber-400 text-amber-400"
                              : "text-neutral-200"
                          }`}
                        />
                      ))}
                    </div>
                    {openReviews ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </button>
                <div
                  className={`mt-2 text-sm text-brand-gray font-medium transition-all duration-300 ${
                    openReviews ? "block opacity-100" : "hidden opacity-0"
                  }`}
                >
                  {product.rating ? `${product.rating} stars out of 5 based on customer feedback.` : "No reviews yet."}
                </div>
              </div>

            </div>
          </div>

          {/* Add to Basket Action */}
          <div className="mt-8">
            <button
              onClick={handleAddToBasket}
              className="w-full rounded-2xl bg-primary py-4.5 text-base font-semibold text-white shadow-md hover:bg-primary-hover active:scale-98 transition-all cursor-pointer"
            >
              Add To Basket
            </button>
          </div>

        </div>
      </div>

      {/* Recommended Products Carousel */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-brand-dark md:text-2xl">
            You may also like
          </h2>
          <div className="no-scrollbar -mx-4 mt-4 flex gap-4 overflow-x-auto px-4 pb-4 md:grid md:grid-cols-4 md:overflow-x-visible md:px-0">
            {relatedProducts.map((p) => (
              <div key={p.id} className="w-44 shrink-0 md:w-auto">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
export default ProductDetails;
