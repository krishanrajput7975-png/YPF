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

            <div className="mt-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-white/90">Leadership</div>
              <ul className="mt-3 space-y-2 text-white/80">
                <li><span className="font-semibold text-white/90">Vekram singh Ramgarhia</span> - Founder and president</li>
                <li><span className="font-semibold text-white/90">Surender sufi</span> - Secretary</li>
                <li><span className="font-semibold text-white/90">Dr. Bharat Chawla</span> - Medical coordinator</li>
              </ul>
            </div>
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
                  href="https://www.yuvvapariwarwelfarefoundation.online"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.yuvvapariwarwelfarefoundation.online
                </a>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-white/90 mb-3">Follow Us</div>
              <div className="flex items-center gap-4">
                <a href="https://youtube.com/@yuvva_pariwar?si=G9XdYf-aran3G3qH" target="_blank" rel="noopener noreferrer" className="text-white/85 hover:text-white hover:opacity-100 opacity-80" aria-label="YouTube">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://www.instagram.com/yuvvapariwarwelfare?igsh=YnhjZGZ6YW4yYXps" target="_blank" rel="noopener noreferrer" className="text-white/85 hover:text-white hover:opacity-100 opacity-80" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.067 3.259.145 4.555 1.438 4.697 4.695.055 1.265.067 1.645.067 4.85s-.012 3.584-.067 4.85c-.142 3.257-1.438 4.55-4.697 4.695-1.266.055-1.646.067-4.85.067s-3.584-.012-4.85-.067c-3.259-.145-4.555-1.438-4.697-4.695-.055-1.265-.067-1.645-.067-4.85s.012-3.584.067-4.85c.142-3.257 1.438-4.55 4.697-4.695 1.266-.055 1.646-.067 4.85-.067M12 0C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.362-2.616-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61556207459745" target="_blank" rel="noopener noreferrer" className="text-white/85 hover:text-white hover:opacity-100 opacity-80" aria-label="Facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
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
