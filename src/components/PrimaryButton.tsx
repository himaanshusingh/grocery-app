import { forwardRef, type ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export const PrimaryButton = forwardRef<HTMLButtonElement, Props>(
  ({ className = "", loading, disabled, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={
          "w-full rounded-2xl bg-[#53B175] py-4 text-base font-semibold text-white shadow-sm transition active:scale-[0.99] hover:bg-[#4ba36b] disabled:opacity-60 disabled:cursor-not-allowed " +
          className
        }
        {...rest}
      >
        {loading ? "Please wait..." : children}
      </button>
    );
  },
);
PrimaryButton.displayName = "PrimaryButton";
