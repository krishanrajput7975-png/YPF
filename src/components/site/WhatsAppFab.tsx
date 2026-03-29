import Link from "next/link";

export function WhatsAppFab({
  phone,
  message = "Hello! I need help.",
}: {
  phone: string;
  message?: string;
}) {
  const digits = phone.replace(/\D/g, "");
  const href = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-[1.04] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
    >
      {/* Clear WhatsApp glyph (white) */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M20.52 3.48A11.91 11.91 0 0 0 12.01 0C5.39 0 0 5.39 0 12c0 2.1.55 4.16 1.6 5.98L0 24l6.23-1.63A11.96 11.96 0 0 0 12.01 24C18.63 24 24 18.61 24 12c0-3.2-1.25-6.2-3.49-8.52Zm-8.51 18.5c-1.83 0-3.62-.49-5.19-1.43l-.37-.22-3.7.97.99-3.6-.24-.38A9.9 9.9 0 0 1 2.02 12c0-5.5 4.48-9.98 9.99-9.98 2.67 0 5.18 1.04 7.06 2.92A9.91 9.91 0 0 1 22 12c0 5.5-4.48 9.98-9.99 9.98Zm5.78-7.48c-.32-.16-1.9-.94-2.19-1.05-.29-.11-.5-.16-.71.16-.21.32-.82 1.05-1 1.26-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.56-.94-.83-1.57-1.85-1.75-2.17-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.67s1.15 3.1 1.31 3.32c.16.21 2.26 3.45 5.48 4.84.77.33 1.37.52 1.83.67.77.24 1.47.2 2.02.12.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37Z"
        />
      </svg>
    </Link>
  );
}
