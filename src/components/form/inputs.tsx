import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export const TextInput = forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>(function TextInput({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-500 focus:border-[var(--color-green)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--color-green)_18%,transparent)]",
        className
      )}
      {...props}
    />
  );
});

export const SelectInput = forwardRef<
  HTMLSelectElement,
  React.ComponentPropsWithoutRef<"select">
>(function SelectInput({ className, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        "h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-zinc-950 outline-none focus:border-[var(--color-green)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--color-green)_18%,transparent)]",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

