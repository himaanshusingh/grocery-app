import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { BANNERS, CATEGORIES, PRODUCTS } from "@/lib/mockData";
import { ProductCard } from "@/components/ProductCard";
import { useProductsStore } from "@/lib/store/products";

export function Home() {
  const navigate = useNavigate();
  const setSearchQuery = useProductsStore((s) => s.setSearchQuery);
  const [activeBanner, setActiveBanner] = useState(0);

  // Auto-scroll banner carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((current) => (current + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Filter products for sections
  const exclusiveOffers = PRODUCTS.filter((p) => p.price < 4.0);
  const bestSellers = PRODUCTS.filter((p) => p.rating && p.rating >= 4.7);

  const handleSearchFocus = () => {
    setSearchQuery("");
    navigate("/search");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 pb-20 md:px-8 md:pb-12 animate-fade-in">
      {/* Mobile Search Bar */}
      <div className="relative mb-6 block md:hidden">
        <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-brand-gray" />
        <input
          type="text"
          placeholder="Search Store"
          onFocus={handleSearchFocus}
          readOnly
          className="w-full rounded-2xl border-none bg-brand-light py-3.5 pr-4 pl-11 text-sm font-semibold outline-hidden focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Hero Banner Carousel */}
      <div className="relative h-36 w-full overflow-hidden rounded-3xl md:h-56">
        {BANNERS.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 flex items-center justify-between p-6 transition-opacity duration-1000 md:p-10 ${
              banner.bgColor
            } ${index === activeBanner ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            <div className="max-w-[50%] space-y-1 md:space-y-3">
              <h2 className="text-xl font-extrabold leading-tight text-brand-dark md:text-3xl">
                {banner.title}
              </h2>
              <p className="text-xs font-semibold text-primary md:text-sm">
                {banner.subtitle}
              </p>
            </div>
            <div className="h-full w-[45%] overflow-hidden rounded-2xl">
              <img
                src={banner.image}
                alt={banner.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}

        {/* Carousel indicators */}
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {BANNERS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveBanner(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeBanner ? "w-6 bg-primary" : "w-2.5 bg-neutral-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Exclusive Offers Section */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand-dark md:text-2xl">
            Exclusive Offer
          </h2>
          <Link
            to="/explore"
            className="text-sm font-bold text-primary hover:text-primary-hover"
          >
            See all
          </Link>
        </div>
        
        {/* Horizontal scroll rail */}
        <div className="no-scrollbar -mx-4 mt-4 flex gap-4 overflow-x-auto px-4 pb-4 md:grid md:grid-cols-4 md:overflow-x-visible md:px-0">
          {exclusiveOffers.slice(0, 4).map((product) => (
            <div key={product.id} className="w-44 shrink-0 md:w-auto">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Best Selling Section */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand-dark md:text-2xl">
            Best Selling
          </h2>
          <Link
            to="/explore"
            className="text-sm font-bold text-primary hover:text-primary-hover"
          >
            See all
          </Link>
        </div>

        {/* Horizontal scroll rail */}
        <div className="no-scrollbar -mx-4 mt-4 flex gap-4 overflow-x-auto px-4 pb-4 md:grid md:grid-cols-4 md:overflow-x-visible md:px-0">
          {bestSellers.slice(0, 4).map((product) => (
            <div key={product.id} className="w-44 shrink-0 md:w-auto">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Groceries Categories Section */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand-dark md:text-2xl">
            Groceries Categories
          </h2>
          <Link
            to="/explore"
            className="text-sm font-bold text-primary hover:text-primary-hover"
          >
            See all
          </Link>
        </div>

        {/* Categories bubble horizontal rail */}
        <div className="no-scrollbar -mx-4 mt-4 flex gap-3.5 overflow-x-auto px-4 pb-4 md:grid md:grid-cols-6 md:overflow-x-visible md:px-0">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to={`/explore/${category.id}`}
              className={`flex items-center gap-3.5 w-44 shrink-0 rounded-2xl border p-4.5 transition-all hover:scale-103 ${category.bgColor} ${category.borderColor} md:w-auto`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-12 w-12 object-contain"
              />
              <span className={`text-sm font-bold leading-tight ${category.textColor}`}>
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
export default Home;
