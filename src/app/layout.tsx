import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecommerce Store",
  description:
    "A modern ecommerce store built with Next.js, TypeScript, Tailwind CSS, and Zustand. Browse our products and enjoy a seamless shopping experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 `}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-white border-t py-8 text-center text-sm text-gray-500">
          Built ecommerce store with Next.js, TypeScript, Tailwind CSS, and
          Zustand. &copy; 2026. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
