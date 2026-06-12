import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import "./globals.css";
import { SWRegister } from "@/components/sw-register";
import { BottomNav } from "@/components/bottom-nav";
import { TopBar } from "@/components/top-bar";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Geist({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "GOAT Mode",
  description:
    "Cribl interview prep — pass every quiz and walk into the Kat and Cam calls 3x more prepared than you need to be.",
  appleWebApp: {
    capable: true,
    title: "GOAT Mode",
    statusBarStyle: "black-translucent",
  },
  icons: {
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#020e1b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-canvas font-body text-ink antialiased">
        <TopBar />
        <div className="min-h-dvh w-full px-4 pb-32 pt-4 sm:px-6 lg:px-8 lg:pb-16 lg:pt-8">
          {children}
        </div>
        <BottomNav />
        <SWRegister />
      </body>
    </html>
  );
}
