"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { IdCardPreviewAndDownload } from "@/components/idcard/IdCardPreviewAndDownload";
import type { MemberIdCardData } from "@/components/idcard/MemberIdCard";
import { FormField } from "@/components/form/FormField";
import { SelectInput, TextInput } from "@/components/form/inputs";
import { registerSchema, type RegisterValues } from "@/lib/validation/register";
import { registerMemberAction } from "@/app/register/actions";
import type { IdCardBranding } from "@/lib/cms-idcard";
import type { Locale } from "@/lib/i18n";

function CopyMemberIdButton({ id, locale = "hi" }: { id: string; locale?: Locale }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(id);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
      }}
      className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-xs font-semibold text-zinc-950 hover:bg-zinc-50"
    >
      {copied ? (locale === "en" ? "Copied" : "कॉपी किया गया") : (locale === "en" ? "Copy Member ID" : "सदस्य आईडी कॉपी करें")}
    </button>
  );
}

export function RegisterForm({ branding, locale = "hi" }: { branding?: IdCardBranding; locale?: Locale }) {
  const [photoDataUrl, setPhotoDataUrl] = useState<string | undefined>(undefined);
  const [submitted, setSubmitted] = useState<MemberIdCardData | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    getValues,
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      bloodGroup: "O+",
    },
  });

  const liveName = watch("fullName");
  const fileBase = useMemo(
    () => liveName?.trim().replace(/\s+/g, "-").toLowerCase() || "member",
    [liveName]
  );

  async function onSubmit(values: RegisterValues) {
    setServerError(null);

    // Save into DB so admin can see it.
    const fd = new FormData();
    fd.set("fullName", values.fullName);
    fd.set("fatherName", values.fatherName);
    fd.set("dob", values.dob);
    fd.set("designation", values.designation);
    fd.set("area", values.area);
    fd.set("district", values.district);
    fd.set("state", values.state);
    fd.set("mobile", values.mobile);
    fd.set("bloodGroup", values.bloodGroup);
    if (photoDataUrl) fd.set("photoDataUrl", photoDataUrl);

    const res = await registerMemberAction(fd);

    if (!res.ok) {
      setServerError(res.error);
      return;
    }

    setSubmitted({
      memberId: res.memberId,
      fullName: values.fullName,
      fatherName: values.fatherName,
      designation: values.designation,
      area: values.area,
      dob: values.dob,
      mobile: values.mobile,
      bloodGroup: values.bloodGroup,
      photoDataUrl,
      status: res.status,
      logoUrl: branding?.logoUrl,
      logoAlt: branding?.logoAlt,
    });
  }

  async function onPhotoPicked(file: File | null) {
    if (!file) {
      setPhotoDataUrl(undefined);
      return;
    }
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result;
      if (typeof res === "string") setPhotoDataUrl(res);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {serverError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
            {serverError}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label={locale === "en" ? "Full Name" : "पूरा नाम"} htmlFor="fullName" required error={errors.fullName?.message}>
            <TextInput id="fullName" placeholder={locale === "en" ? "Enter full name" : "अपना पूरा नाम दर्ज करें"} {...register("fullName")} />
          </FormField>

          <FormField label={locale === "en" ? "Father Name" : "पिता का नाम"} htmlFor="fatherName" required error={errors.fatherName?.message}>
            <TextInput id="fatherName" placeholder={locale === "en" ? "Enter father name" : "पिता का नाम दर्ज करें"} {...register("fatherName")} />
          </FormField>

          <FormField label={locale === "en" ? "DOB" : "जन्म तिथि (DOB)"} htmlFor="dob" required error={errors.dob?.message}>
            <TextInput id="dob" type="date" {...register("dob")} />
          </FormField>

          <FormField
            label={locale === "en" ? "Mobile" : "मोबाइल"}
            htmlFor="mobile"
            required
            hint={locale === "en" ? "10-digit Indian mobile number" : "10 अंकों का मोबाइल नंबर"}
            error={errors.mobile?.message}
          >
            <TextInput id="mobile" inputMode="numeric" placeholder="9876543210" {...register("mobile")} />
          </FormField>

          <FormField label={locale === "en" ? "Designation" : "पद"} htmlFor="designation" required error={errors.designation?.message}>
            <TextInput id="designation" placeholder={locale === "en" ? "(e.g.) Member" : "(उदा.) सदस्य"} {...register("designation")} />
          </FormField>

          <FormField label={locale === "en" ? "Area/Tehsil" : "क्षेत्र/तहसील"} htmlFor="area" required error={errors.area?.message}>
            <TextInput id="area" placeholder={locale === "en" ? "Enter area/tehsil" : "क्षेत्र/तहसील दर्ज करें"} {...register("area")} />
          </FormField>

          <FormField label={locale === "en" ? "District" : "जिला"} htmlFor="district" required error={errors.district?.message}>
            <TextInput id="district" placeholder={locale === "en" ? "Enter district" : "जिला दर्ज करें"} {...register("district")} />
          </FormField>

          <FormField label={locale === "en" ? "State" : "राज्य"} htmlFor="state" required error={errors.state?.message}>
            <TextInput id="state" placeholder={locale === "en" ? "Enter state" : "राज्य दर्ज करें"} {...register("state")} />
          </FormField>

          <FormField label={locale === "en" ? "Blood Group" : "रक्त समूह"} htmlFor="bloodGroup" required error={errors.bloodGroup?.message}>
            <SelectInput id="bloodGroup" {...register("bloodGroup")}>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </SelectInput>
          </FormField>

          <div className="md:col-span-2">
            <FormField label={locale === "en" ? "Photo (optional)" : "फोटो (वैकल्पिक)"} htmlFor="photo">
              <input
                id="photo"
                type="file"
                accept="image/*"
                className="block w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-950 file:mr-4 file:rounded-full file:border-0 file:bg-[color-mix(in_oklab,var(--color-green)_10%,white)] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-[var(--color-green)]"
                onChange={(e) => void onPhotoPicked(e.target.files?.[0] ?? null)}
              />
            </FormField>
            <p className="mt-2 text-xs text-zinc-700">
              {locale === "en" ? "Photo is optional. If not provided, a default avatar will be used on the preview." : "फोटो वैकल्पिक है। यदि नहीं दी गई है, तो प्रीव्यू पर डिफ़ॉल्ट अवतार का उपयोग किया जाएगा।"}
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--color-green)] px-6 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (locale === "en" ? "Submitting…" : "प्रस्तुत कर रहा है…") : (locale === "en" ? "Submit registration" : "पंजीकरण जमा करें")}
        </button>

        {submitted ? (
          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <div className="text-sm font-semibold text-zinc-950">{locale === "en" ? "Registration received" : "पंजीकरण प्राप्त हुआ"}</div>
            <p className="mt-2 text-sm text-zinc-700">
              {locale === "en" ? "Your Member ID is " : "आपकी सदस्य आईडी है "}
              <span className="font-mono font-semibold text-zinc-950">{submitted.memberId}</span>. {locale === "en" ? `Status: ${submitted.status}.` : `स्थिति: ${submitted.status === "approved" ? "सत्यापित" : "लंबित"}।`}
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <CopyMemberIdButton id={submitted.memberId} locale={locale} />
              <Link
                href={`/${locale}/verify/${submitted.memberId}`}
                className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--color-green)] px-5 text-xs font-semibold text-white"
              >
                {locale === "en" ? "Open verification" : "सत्यापन खोलें"}
              </Link>
            </div>
            <p className="mt-3 text-xs text-zinc-600">
              {locale === "en" ? "Tip: Save your Member ID in notes/WhatsApp. You can always verify your status from the Verify page." : "सुझाव: अपनी सदस्य आईडी को नोट्स/व्हाट्सएप में सेव करें। आप हमेशा सत्यापित पृष्ठ से अपनी स्थिति सत्यापित कर सकते हैं।"}
            </p>
          </div>
        ) : (
          <p className="text-xs text-zinc-700">
            {locale === "en" ? "After submit you’ll get a Member ID and an ID card preview." : "सबमिट करने के बाद आपको एक सदस्य आईडी और आईडी कार्ड का पूर्वावलोकन मिलेगा।"}
          </p>
        )}
      </form>

      {submitted ? <IdCardPreviewAndDownload data={submitted} locale={locale} /> : null}
    </div>
  );
}
