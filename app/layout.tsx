import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "CI/CD demo | Jenkins/GitHub Actions",
    template: "%s | CI/CD demo | Jenkins/GitHub Actions",
  },
  description:
    "Learn CI/CD concepts and typical Jenkins pipeline stages with an animated Next.js static site. Jenkins/GitHub Actions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased bg-[#090d14] text-slate-200 selection:bg-cyan-500/25 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
