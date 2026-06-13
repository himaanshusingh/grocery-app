import React from "react";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-neutral-100 bg-white p-4 shadow-xs">
      <div className="h-32 w-full animate-shimmer rounded-xl"></div>
      <div className="mt-4 space-y-2">
        <div className="h-4 w-3/4 animate-shimmer rounded-sm"></div>
        <div className="h-3 w-1/2 animate-shimmer rounded-sm"></div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="h-5 w-1/3 animate-shimmer rounded-sm"></div>
        <div className="h-9 w-9 animate-shimmer rounded-xl"></div>
      </div>
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left image skeleton */}
        <div className="h-64 w-full animate-shimmer rounded-2xl md:h-[400px]"></div>

        {/* Right details skeleton */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-8 w-3/4 animate-shimmer rounded-sm"></div>
            <div className="h-4 w-1/4 animate-shimmer rounded-sm"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="h-10 w-24 animate-shimmer rounded-lg"></div>
            <div className="h-8 w-20 animate-shimmer rounded-sm"></div>
          </div>

          <hr className="border-neutral-100" />

          <div className="space-y-3">
            <div className="h-4 w-full animate-shimmer rounded-sm"></div>
            <div className="h-4 w-5/6 animate-shimmer rounded-sm"></div>
            <div className="h-4 w-4/5 animate-shimmer rounded-sm"></div>
          </div>

          <div className="h-12 w-full animate-shimmer rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="h-40 rounded-2xl border border-neutral-100 p-4 shadow-xs flex flex-col items-center justify-center space-y-3">
      <div className="h-16 w-16 animate-shimmer rounded-full"></div>
      <div className="h-4 w-2/3 animate-shimmer rounded-sm"></div>
    </div>
  );
}
