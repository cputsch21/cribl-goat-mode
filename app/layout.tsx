import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import "./globals.css";
import { SWRegister } from "@/components/sw-register";
import { BottomNav } from "@/components/bottom-nav";
import { TopBar } from "@/components/top-bar";
import { Tutor, TutorProvider, TutorShell } from "@/components/tutor";

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
    "Your Cribl AE ramp — master the product, the sales motion, and every seat on the buying committee.",
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
  themeColor: "#0a2730",
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
      <body className="bg-cribl-soft font-body text-ink antialiased">
        <TutorProvider>
          {/* Everything in the shell slides left to make room for the tutor
              panel on wide screens; the panel itself sits outside it. */}
          <TutorShell>
            <TopBar />
            <div className="min-h-dvh w-full px-4 pb-32 pt-[calc(env(safe-area-inset-top)+0.625rem)] sm:px-6 lg:px-8 lg:pb-16 lg:pt-8">
              {children}
            </div>
            <BottomNav />
          </TutorShell>
          <Tutor />
        </TutorProvider>
        <SWRegister />
      </body>
    </html>
  );
}
