"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { FormField } from "@/components/form/FormField";
import { TextInput } from "@/components/form/inputs";
import { verifySchema, type VerifyValues } from "@/lib/validation/verify";
import type { Locale } from "@/lib/i18n";

export function VerifySearchForm({ locale = "hi" }: { locale?: Locale }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: { memberId: "" },
  });

  async function onSubmit(values: VerifyValues) {
    router.push(`/${locale}/verify/${values.memberId}`);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"
    >
      <div>
        <FormField
          label={locale === "en" ? "Member ID or Mobile" : "सदस्य संख्या या मोबाइल नंबर"}
          htmlFor="memberId"
          required
          error={errors.memberId?.message}
        >
          <TextInput
            id="memberId"
            placeholder={
              locale === "en"
                ? "Paste Member ID or 10-digit mobile"
                : "Member ID या मोबाइल नंबर दर्ज करें"
            }
            autoComplete="off"
            spellCheck={false}
            {...register("memberId")}
          />
        </FormField>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 rounded-xl bg-[var(--color-green)] px-5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? locale === "en"
            ? "Checking…"
            : "जांच हो रही है…"
          : locale === "en"
          ? "Verify"
          : "सत्यापन करें"}
      </button>
    </form>
  );
}
