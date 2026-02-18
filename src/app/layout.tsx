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
  title: "EMPOWERED FOR CHANGE (E4C) - Women's Rights Organization",
  description: "Empowering women and girls of all abilities to realize their reproductive health goals by providing tools for informed decisions and creating enabling environments.",
  keywords: "women's rights, reproductive health, gender equality, empowerment, disability inclusion, Tanzania, SRH services",
  authors: [{ name: "EMPOWERED FOR CHANGE (E4C)" }],
  openGraph: {
    title: "EMPOWERED FOR CHANGE (E4C) - Women's Rights Organization",
    description: "Empowering women and girls of all abilities to realize their reproductive health goals through informed decisions and enabling environments.",
    type: "website",
    locale: "en_US",
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
        <main className="flex-1 pt-20 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
