import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pizzapalace.example.com"),
  title: {
    default: "Pizza Palace — Slow Dough. Fierce Fire.",
    template: "%s | Pizza Palace",
  },
  description:
    "48-hour fermented dough, San Marzano tomato, live oak fire at 450C. Neighborhood wood-fired pizza in Hayes Valley, ready for pickup in 15 minutes.",
  keywords: [
    "pizza",
    "wood-fired pizza",
    "Neapolitan pizza",
    "pizza pickup",
    "Hayes Valley restaurant",
  ],
  authors: [{ name: "Pizza Palace" }],
  creator: "Pizza Palace",
  publisher: "Pizza Palace",
  robots: "index, follow",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pizzapalace.example.com",
    siteName: "Pizza Palace",
    title: "Pizza Palace — Slow Dough. Fierce Fire.",
    description:
      "48-hour dough, San Marzano tomato, wood fire at 450C. Pickup in 15 minutes.",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Wood-fired margherita pizza at Pizza Palace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pizza Palace — Slow Dough. Fierce Fire.",
    description:
      "48-hour dough, San Marzano tomato, wood fire at 450C. Pickup in 15 minutes.",
    images: ["/hero.png"],
  },
  alternates: {
    canonical: "https://pizzapalace.example.com",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFBF2" },
    { media: "(prefers-color-scheme: dark)", color: "#FFFBF2" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#FFFBF2] font-sans text-[#1A1714] antialiased">
        {children}
      </body>
    </html>
  );
}
