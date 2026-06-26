"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, HelpCircle, Target, Zap, Swords, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/", label: "Course", icon: Home, exact: true },
  { href: "/cheat-sheet", label: "Cheat", icon: Zap, exact: false },
  { href: "/flashcards", label: "Cards", icon: Layers, exact: false },
  { href: "/faq", label: "FAQ", icon: HelpCircle, exact: false },
  { href: "/professor", label: "Prof", icon: Brain, exact: false },
  { href: "/deal", label: "Deal", icon: Target, exact: false },
  { href: "/dojo", label: "Dojo", icon: Swords, exact: false },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-4 left-1/2 z-30 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl bg-ink px-1.5 py-1.5 shadow-lift lg:hidden">
      <div className="grid grid-cols-7">
        {ITEMS.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-xl py-2 text-[10px] font-medium whitespace-nowrap transition-colors duration-150 ease-out",
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
