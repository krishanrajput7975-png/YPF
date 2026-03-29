import { cn } from "@/lib/utils";

export function FormField({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-zinc-950">
        {label} {required ? <span className="text-red-600">*</span> : null}
      </label>
      {children}
      {error ? (
        <p className="text-sm font-medium text-red-600">{error}</p>
      ) : hint ? (
        <p className="text-xs text-zinc-700">{hint}</p>
      ) : null}
    </div>
  );
}

