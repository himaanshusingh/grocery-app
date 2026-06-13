import type { ReactNode } from "react";

/**
 * Pastel-gradient shell used by all auth/onboarding screens.
 * Mobile-first; centers a max-w-md column on larger screens.
 */
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background:
          "radial-gradient(60% 40% at 15% 12%, rgba(252, 220, 200, 0.55), transparent 70%)," +
          "radial-gradient(50% 35% at 90% 8%, rgba(200, 235, 230, 0.65), transparent 70%)," +
          "radial-gradient(45% 35% at 85% 95%, rgba(255, 215, 220, 0.55), transparent 70%)," +
          "radial-gradient(45% 35% at 10% 92%, rgba(215, 220, 255, 0.55), transparent 70%)," +
          "#ffffff",
      }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 pb-8 pt-12">
        {children}
      </div>
    </div>
  );
}

export function CarrotLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M20 56 L44 32 L32 20 Z"
        fill="#F97316"
      />
      <path
        d="M32 20 c0-6 4-10 8-10 c-1 4 -2 7 -5 9 c4-2 8 0 9 4 c-4 1 -7 0 -10-3 c2 4 0 8 -4 9 z"
        fill="#22C55E"
      />
    </svg>
  );
}
