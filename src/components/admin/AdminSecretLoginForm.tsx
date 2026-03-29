"use client";

import { useActionState, useEffect, useRef } from "react";

import { TextInput } from "@/components/form/inputs";
import { adminLoginAction } from "@/app/admin-portal/login/actions";

const initialState: { error?: string } = {};

export function AdminSecretLoginForm() {
  const [state, action, pending] = useActionState(adminLoginAction, initialState);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form action={action} className="space-y-4">
      {state?.error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
          {state.error}
        </div>
      ) : null}

      <div>
        <label className="text-sm font-semibold text-zinc-950">Secret code</label>
        <div className="mt-1">
          <TextInput
            ref={inputRef}
            name="code"
            type="password"
            placeholder="Enter secret code"
            autoComplete="one-time-code"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--color-green)] px-6 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Checking…" : "Enter admin portal"}
      </button>

      <p className="text-xs text-zinc-700">
        Tip: The secret is configured via <span className="font-mono">ADMIN_PORTAL_SECRET</span> in your environment.
      </p>
    </form>
  );
}
