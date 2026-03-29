"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormField } from "@/components/form/FormField";
import { TextArea } from "@/components/form/TextArea";
import { TextInput } from "@/components/form/inputs";
import { contactSchema, type ContactValues } from "@/lib/validation/contact";
import { submitContactMessageAction } from "@/app/contact/actions";

export function ContactForm({ locale = "hi" }: { locale?: "en" | "hi" }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  async function onSubmit(values: ContactValues) {
    setSubmitError(null);

    try {
      const fd = new FormData();
      fd.set("name", values.name);
      fd.set("phone", values.phone ?? "");
      fd.set("email", values.email ?? "");
      fd.set("message", values.message);

      await submitContactMessageAction(fd);

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 3500);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Failed to send message. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {submitError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
          {submitError}
        </div>
      ) : null}

      {submitted ? (
        <div className="rounded-xl border border-[color-mix(in_oklab,var(--color-green)_35%,white)] bg-[color-mix(in_oklab,var(--color-green)_10%,white)] p-4 text-sm font-semibold text-[var(--color-green)]">
          {locale === "en" ? "Thanks! Your message has been received." : "धन्यवाद! आपका संदेश हमें मिल गया है।"}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label={locale === "en" ? "Name" : "नाम"} htmlFor="name" required error={errors.name?.message}>
          <TextInput id="name" placeholder={locale === "en" ? "Your name" : "आपका नाम"} {...register("name")} />
        </FormField>

        <FormField label={locale === "en" ? "Phone" : "फ़ोन"} htmlFor="phone" error={errors.phone?.message}>
          <TextInput id="phone" inputMode="numeric" placeholder="9876543210" {...register("phone")} />
        </FormField>

        <FormField label={locale === "en" ? "Email" : "ईमेल"} htmlFor="email" error={errors.email?.message} className="md:col-span-2">
          <TextInput id="email" type="email" placeholder="name@example.com" {...register("email")} />
        </FormField>

        <FormField label={locale === "en" ? "Message" : "संदेश"} htmlFor="message" required error={errors.message?.message} className="md:col-span-2">
          <TextArea id="message" placeholder={locale === "en" ? "Write your message…" : "अपना संदेश यहाँ लिखें…"} {...register("message")} />
        </FormField>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--color-green)] px-6 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (locale === "en" ? "Sending…" : "भेज रहा है…") : (locale === "en" ? "Send message" : "संदेश भेजें")}
      </button>
    </form>
  );
}
