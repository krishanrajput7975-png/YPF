import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  React.ComponentPropsWithoutRef<"textarea">
>(function TextArea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[120px] w-full resize-y rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-500 focus:border-[var(--color-green)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--color-green)_18%,transparent)]",
        className
      )}
      {...props}
    />
  );
});

