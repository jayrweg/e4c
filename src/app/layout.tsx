import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Empowered for Change — Women Leading Positive Change",
    template: "%s | Empowered for Change",
  },
  description:
    "We are women leading positive change — empowering women and girls of all abilities to realize their reproductive health goals by providing them with tools to make informed decisions and creating enabling environments for them to fulfill their potentials.",
  keywords: [
    "women empowerment",
    "reproductive health",
    "gender equality",
    "positive change",
    "disability inclusion",
    "Tanzania",
    "SRH services",
    "sexual and reproductive health",
    "family planning",
    "NGO Tanzania",
  ],
  authors: [{ name: "Empowered for Change" }],
  creator: "Empowered for Change",
  publisher: "Empowered for Change",
  metadataBase: new URL("https://empoweredforchange.org"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Empowered for Change — Women Leading Positive Change",
    description:
      "We are women leading positive change — empowering women and girls of all abilities to realize their reproductive health goals by providing them with tools to make informed decisions and creating enabling environments for them to fulfill their potentials.",
    type: "website",
    locale: "en_US",
    siteName: "Empowered for Change",
    images: [
      {
        url: "/favicon-512x512.png",
        width: 512,
        height: 512,
        alt: "Empowered for Change Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Empowered for Change — Women Leading Positive Change",
    description:
      "We are women leading positive change — empowering women and girls of all abilities to realize their reproductive health goals.",
    images: ["/favicon-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 pt-20 w-full overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
