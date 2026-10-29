import type { Metadata } from "next";
import { Lora } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { NavBar } from "@/components/NavBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KeyCrypt - Never lose a password again",
  description: "Keep everything safe, synced, and easy to access with KeyCrypt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} bg-[#e0f3fc] text-slate-800 antialiased`}
        suppressHydrationWarning
      >
        <NavBar />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
