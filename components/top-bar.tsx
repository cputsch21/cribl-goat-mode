"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, HelpCircle, Target, Zap, Swords } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Course", icon: Home, exact: true },
  { href: "/cheat-sheet", label: "Cheat Sheet", icon: Zap, exact: false },
  { href: "/flashcards", label: "Flashcards", icon: Layers, exact: false },
  { href: "/faq", label: "FAQ", icon: HelpCircle, exact: false },
  { href: "/deal", label: "Deal", icon: Target, exact: false },
  { href: "/dojo", label: "Dojo", icon: Swords, exact: false },
];

/** Slim desktop top bar — the dock's twin for lg: screens. */
export function TopBar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 hidden w-full bg-ink lg:block">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-8">
        <Link
          href="/"
          className="font-display text-sm font-bold tracking-[0.18em] text-white transition-colors duration-150 ease-out hover:text-gold"
        >
          🐐 GOAT <span className="text-gold">MODE</span>
        </Link>
        <nav className="flex items-center gap-7">
          {LINKS.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors duration-150 ease-out",
                  active ? "text-gold" : "text-white/55 hover:text-white/85"
                )}
              >
                <Icon size={16} strokeWidth={2.2} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="h-[3px] w-full bg-cribl" />
    </header>
  );
}
