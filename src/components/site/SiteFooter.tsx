import Link from "next/link";

export function SiteFooter({ locale = "hi" }: { locale?: "hi" | "en" } = {}) {
  return (
    <footer className="mt-auto border-t border-black/10 bg-[var(--color-green-deep)] text-white">
      {/* Saffron accent */}
      <div className="h-1 w-full bg-[var(--color-saffron)]" />

      <div className="bg-gradient-to-b from-[color-mix(in_oklab,var(--color-green-deep)_92%,black)] to-[color-mix(in_oklab,var(--color-green-deep)_70%,black)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm text-white/85 md:grid-cols-3">
          <div>
            <div className="font-semibold text-white">Yuvva Pariwar Welfare Foundation</div>
            <p className="mt-2 text-sm leading-6 text-white/80">
              सदस्यता • ID कार्ड • Verification • फाउंडेशन की खबरें
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-white/90">Quick Links</div>
            <ul className="mt-3 space-y-2">
              <li>
                <Link className="text-white/80 hover:text-white hover:underline" href={`/${locale}/register`}>
                  सदस्य बनें
                </Link>
              </li>
              <li>
                <Link className="text-white/80 hover:text-white hover:underline" href={`/${locale}/verify`}>
                  Verify Member
                </Link>
              </li>
              <li>
                <Link className="text-white/80 hover:text-white hover:underline" href={`/${locale}/gallery`}>
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-white/90">Office & Contact</div>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Sagriya Road, Near Karni Petrol Pump,
              <br />
              Hanumangarh, Rajasthan - 335513 (Approx)
            </p>

            <div className="mt-3 space-y-1 text-sm">
              <div className="text-white/80">
                Phone:{" "}
                <a className="text-white/85 hover:text-white hover:underline" href="tel:+918005523773">
                  +91 80055-23773
                </a>
                {" / "}
                <a className="text-white/85 hover:text-white hover:underline" href="tel:+919929319003">
                  +91 99293-19003
                </a>
              </div>
              <div className="text-white/80">
                Email:{" "}
                <a className="text-white/85 hover:text-white hover:underline" href="mailto:vs891348@gmail.com">
                  vs891348@gmail.com
                </a>
              </div>
              <div className="text-white/80">
                Website:{" "}
                <a
                  className="text-white/85 hover:text-white hover:underline"
                  href="https://www.yuvvapariwar.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.yuvvapariwar.org
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/70">
            © {new Date().getFullYear()} Yuvva Pariwar Welfare Foundation. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
