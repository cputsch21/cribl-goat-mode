"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Mic, Footprints } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/", label: "Course", icon: Home, exact: true },
  { href: "/flashcards", label: "Flashcards", icon: Layers, exact: false },
  { href: "/gauntlet", label: "Gauntlet", icon: Mic, exact: false },
  { href: "/goat-trail", label: "Trail", icon: Footprints, exact: false },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-4 left-1/2 z-30 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl bg-ink px-2 py-1.5 shadow-lift lg:hidden">
      <div className="grid grid-cols-4">
        {ITEMS.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-xl py-2 text-[11px] font-medium transition-colors duration-150 ease-out",
                active ? "text-gold" : "text-white/55 hover:text-white/85"
              )}
            >
              <Icon size={18} strokeWidth={2.2} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
