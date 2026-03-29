import type { Metadata } from "next";
import { Oswald, Poppins } from "next/font/google";
import "./globals.css";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { foundationContact } from "@/lib/contact";

const headline = Oswald({
  variable: "--font-headline",
  subsets: ["latin"],
  display: "swap",
});

const body = Poppins({
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yuvva Pariwar Foundation",
  description: "Member portal and ID verification",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hi"
      className={`${headline.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-950">
        {children}

        {/* Floating WhatsApp button */}
        <WhatsAppFab
          phone={foundationContact.whatsappPrimary}
          message="Hello! I want to contact Yuvva Pariwar Welfare Foundation."
        />
      </body>
    </html>
  );
}
