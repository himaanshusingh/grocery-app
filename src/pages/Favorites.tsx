import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart, ChevronRight } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favorites";
import { useCartStore } from "@/lib/store/cart";

export function Favorites() {
  const navigate = useNavigate();
  const favItems = useFavoritesStore((s) => s.items);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddAllToCart = () => {
    favItems.forEach((item) => {
      addItem(item, 1);
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-20 md:px-8 md:pb-12 animate-fade-in">
      <h1 className="hidden md:block text-2xl font-bold text-brand-dark mb-6 text-center">
        Favorites
      </h1>

      {favItems.length > 0 ? (
        <div className="space-y-4 max-w-3xl mx-auto">
          {/* Header Action */}
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <span className="text-sm font-semibold text-brand-gray">
              {favItems.length} {favItems.length === 1 ? "item" : "items"} saved
            </span>
            <button
              onClick={handleAddAllToCart}
              className="text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-1 cursor-pointer"
            >
              Add all to cart <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* List of items */}
          <div className="divide-y divide-neutral-100">
            {favItems.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 py-4.5 transition-all hover:bg-neutral-50/50 px-2 rounded-xl group"
              >
                {/* Product Thumbnail */}
                <div
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-neutral-100 bg-white flex items-center justify-center p-1.5"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-auto object-contain transition-transform group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="flex-1 cursor-pointer min-w-0"
                >
                  <h3 className="text-sm font-bold text-brand-dark truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs text-brand-gray font-medium mt-0.5">
                    {product.unit}
                  </p>
                </div>

                {/* Price */}
                <div className="text-sm font-bold text-brand-dark pr-2">
                  ${product.price.toFixed(2)}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {/* Quick add */}
                  <button
                    onClick={() => addItem(product, 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                    title="Add to basket"
                  >
                    <ShoppingCart className="h-4.5 w-4.5" />
                  </button>

                  {/* Remove */}
                  <button
                    onClick={() => removeFavorite(product.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-50 text-neutral-400 hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer"
                    title="Remove from favorites"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in max-w-sm mx-auto">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-50 text-5xl">
            ❤️
          </div>
          <h2 className="mt-6 text-xl font-bold text-brand-dark">No favorites yet</h2>
          <p className="mt-2 text-sm text-brand-gray font-medium">
            Tap the heart icon on any product card or details page to add items to your wishlist.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="mt-8 rounded-2xl bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-primary-hover active:scale-98 transition-all cursor-pointer"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
}
export default Favorites;
