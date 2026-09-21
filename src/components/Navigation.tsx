"use client";

import { useState } from "react";
import { Flame, List, X } from "@phosphor-icons/react";
import { track } from "@/lib/analytics";

const links = [
  { href: "#craft", label: "Craft" },
  { href: "#menu", label: "Menu" },
  { href: "#visit", label: "Visit" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Non-sticky full-width bar. Absolutely positioned inside the hero,
          so it scrolls away with the hero and only exists while hero is visible. */}
      <header className="nav-fade absolute inset-x-0 top-0 z-40 w-full border-b border-[#1A1714]/10 bg-[#FFFBF2]/85 backdrop-blur-md">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-4 px-4 min-[380px]:px-6"
        >
          <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label="Pizza Palace home">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1A1714] text-[#FFFBF2]">
              <Flame size={18} weight="fill" aria-hidden="true" />
            </span>
            <span className="text-[13px] font-bold tracking-[0.22em]">
              PIZZA&nbsp;PALACE
            </span>
          </a>

          <div className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[#1A1714]/65 transition-colors duration-300 hover:text-[#C93A2B]"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <a
              href="tel:+14155550134"
              onClick={() => track("phone_click", { location: "nav" })}
              className="hidden font-mono text-xs tracking-wide text-[#1A1714]/55 transition-colors hover:text-[#1A1714] lg:inline"
            >
              (415) 555-0134
            </a>
            <a
              href="#visit"
              onClick={() => track("order_intent", { location: "nav" })}
              className="group hidden items-center gap-2 rounded-full bg-[#1A1714] py-2 pl-6 pr-2 text-sm font-medium text-[#FFFBF2] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] sm:inline-flex"
            >
              <span className="py-1.5">Order Pickup</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-white/30">
                <Flame size={16} weight="bold" aria-hidden="true" />
              </span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1A1714]/12 text-[#1A1714] transition-colors hover:bg-[#1A1714]/5 md:hidden"
            >
              {open ? (
                <X size={20} weight="regular" aria-hidden="true" />
              ) : (
                <List size={20} weight="regular" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown — part of the same non-sticky header, scrolls away too */}
        <div
          className={`overflow-hidden border-[#1A1714]/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
            open ? "max-h-80 border-t" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-[#1A1714]/80 transition-colors hover:bg-[#1A1714]/5 hover:text-[#1A1714]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#visit"
              onClick={() => {
                track("order_intent", { location: "nav_mobile" });
                setOpen(false);
              }}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#1A1714] px-6 py-3.5 text-sm font-medium text-[#FFFBF2]"
            >
              Order Pickup
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
