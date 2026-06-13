import { Link } from "react-router-dom";
import { Heart, Plus, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";
import { useFavoritesStore } from "@/lib/store/favorites";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFav = useFavoritesStore((s) => s.isFavorite(product.id));

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product);
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md">
      {/* Favorite Heart Button */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 z-10 rounded-full bg-white/80 p-1.5 text-neutral-400 backdrop-blur-xs transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={`h-5 w-5 transition-colors duration-300 ${
            isFav ? "fill-red-500 text-red-500" : "text-neutral-400 group-hover:text-neutral-600"
          }`}
        />
      </button>

      {/* Product Link Wrapper */}
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        {/* Product Image */}
        <div className="flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-50/50">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-28 w-auto object-contain transition-transform duration-500 group-hover:scale-108"
          />
        </div>

        {/* Product Information */}
        <div className="mt-4 flex flex-col flex-grow">
          <h3 className="text-sm font-bold text-brand-dark line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-brand-gray">
            {product.unit}
          </p>
        </div>
      </Link>

      {/* Price & Add to Cart button */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-base font-bold text-brand-dark">
          ${product.price.toFixed(2)}
        </span>
        <button
          onClick={handleAddClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-xs transition-all duration-300 hover:bg-primary-hover hover:scale-105 active:scale-95"
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
