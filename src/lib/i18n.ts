export type Locale = "hi" | "en";

export const LOCALES: readonly Locale[] = ["hi", "en"] as const;
export const DEFAULT_LOCALE: Locale = "hi";

export function isLocale(x: string | undefined | null): x is Locale {
  return x === "hi" || x === "en";
}

export type Dictionary = {
  nav: {
    home: string;
    about: string;
    gallery: string;
    register: string;
    verify: string;
    contact: string;
  };
  toggles: {
    language: string;
    hindi: string;
    english: string;
  };
};

const DICTS: Record<Locale, Dictionary> = {
  hi: {
    nav: {
      home: "Home",
      about: "About",
      gallery: "Gallery",
      register: "सदस्य बनें",
      verify: "Verify",
      contact: "Contact",
    },
    toggles: {
      language: "भाषा",
      hindi: "हिंदी",
      english: "English",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      gallery: "Gallery",
      register: "Become a member",
      verify: "Verify",
      contact: "Contact",
    },
    toggles: {
      language: "Language",
      hindi: "Hindi",
      english: "English",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return DICTS[locale];
}

