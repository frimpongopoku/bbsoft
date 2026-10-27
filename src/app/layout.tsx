import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EMAIL, SITE_URL } from "@/content/contact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#0b0b0c",
};

const DESCRIPTION =
  "Biibisoft is a software development studio in Accra, Ghana. We design, build and launch websites, web apps, mobile apps and AI systems for companies and first-time founders, and run products of our own.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Biibisoft — Software development studio in Accra, Ghana",
    template: "%s — Biibisoft",
  },
  description: DESCRIPTION,
  applicationName: "Biibisoft",
  keywords: [
    "Biibisoft",
    "software development company Ghana",
    "software company Accra",
    "web development Ghana",
    "mobile app development Ghana",
    "app developers Accra",
    "AI development Ghana",
    "MVP development for startups",
    "custom software development",
    "hire developers Ghana",
  ],
  authors: [{ name: "Biibisoft", url: SITE_URL }],
  creator: "Biibisoft",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "/",
    siteName: "Biibisoft",
    title: "Biibisoft — Software, considered.",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Biibisoft — Software, considered.",
    description: DESCRIPTION,
  },
  formatDetection: { telephone: false, email: false, address: false },
};

// Structured data for search engines. The phone number is deliberately left out.
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: "Biibisoft",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/biibisoft-mark.svg`,
  image: `${SITE_URL}/opengraph-image`,
  description: DESCRIPTION,
  email: EMAIL,
  address: { "@type": "PostalAddress", addressLocality: "Accra", addressRegion: "Greater Accra", addressCountry: "GH" },
  areaServed: "Worldwide",
  knowsAbout: ["Web development", "Mobile app development", "Custom software", "Artificial intelligence"],
  contactPoint: { "@type": "ContactPoint", contactType: "sales", email: EMAIL, availableLanguage: ["English"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD).replace(/</g, "\\u003c") }}
        />
        <Header />
        <main className="grow flex flex-col w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
