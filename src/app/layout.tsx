import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Biibisoft | Product Innovation and Engineering Services",
  description:
    "Biibisoft is a Ghanaian software company that builds original digital products and partners with organizations to engineer high-performance web, mobile, and AI systems.",
  keywords: [
    "Biibisoft",
    "Software Company Ghana",
    "Product Innovation",
    "Web Development Ghana",
    "Mobile App Development",
    "AI Engineering",
    "Custom Software Solutions",
  ],
  authors: [{ name: "Biibisoft" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://biibisoft.com",
    title: "Biibisoft | Product Innovation and Engineering Services",
    description:
      "Ghanaian software company building internal products and delivering engineering services for client teams.",
    siteName: "Biibisoft",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biibisoft | Product Innovation and Engineering Services",
    description:
      "Ghanaian software company for innovation-led products and partner engineering.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const theme = savedTheme || systemTheme;
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="grow flex flex-col w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
