"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flame, ArrowRight } from "@phosphor-icons/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const marquee = ["Margherita", "Diavola", "Bianca", "Marinara", "Funghi"];

// Repeated 3x per half so each half is always wider than the viewport.
// Track animates -50%, so both halves must be pixel-identical with no outer gap.
const marqueeRow = [...marquee, ...marquee, ...marquee];

const pies = [
  {
    name: "Margherita",
    note: "San Marzano, fior di latte, basil, olive oil.",
    price: "$14",
    src: "/margherita.png",
    alt: "Margherita pizza with basil leaves",
  },
  {
    name: "Diavola",
    note: "Spicy salami, honey drizzle, smoked mozzarella.",
    price: "$17",
    src: "/diavola.png",
    alt: "Diavola pizza with spicy salami cups",
  },
  {
    name: "Bianca",
    note: "Ricotta, garlic confit, rosemary, lemon zest.",
    price: "$16",
    src: "/bianca.png",
    alt: "White pizza with ricotta and rosemary",
  },
];

const manifesto =
  "We keep the menu short so every pie earns its place. Fermented dough, bright sauce, live fire. Order ahead and it leaves the oven as you arrive.".split(
    " "
  );

export default function MenuDesire() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Scrubbing text reveal: words 0.15 -> 1 sequentially
        gsap.to(".scrub-word", {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: ".scrub-block",
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        });

        // Menu images: scale 0.8 -> 1 on enter, fade toward 0.25 on exit
        gsap.utils.toArray<HTMLElement>(".menu-card").forEach((card) => {
          const img = card.querySelector(".menu-zoom");
          gsap.fromTo(
            img,
            { scale: 0.8 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                end: "top 45%",
                scrub: 1,
              },
            }
          );
          gsap.to(card, {
            opacity: 0.25,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "bottom 55%",
              end: "bottom 5%",
              scrub: 1,
            },
          });
        });
      }, root);
      return () => ctx.revert();
    },
    { scope: root }
  );

  return (
    <section
      id="menu"
      ref={root}
      aria-labelledby="menu-title"
      className="relative w-full bg-[#FFFBF2]"
    >
      {/* Single thin marquee divider — only marquee on the page */}
      <div
        aria-hidden="true"
        className="overflow-hidden border-y border-[#1A1714]/10 py-4"
      >
        <div className="marquee-track items-center">
          {[0, 1].map((half) => (
            <div
              key={half}
              aria-hidden={half === 1}
              className="flex shrink-0 items-center gap-10 pr-10"
            >
              {marqueeRow.map((w, i) => (
                <span key={`${half}-${i}`} className="flex items-center gap-10">
                  <span className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.2em] text-[#1A1714]/30">
                    {w}
                  </span>
                  <Flame
                    size={14}
                    weight="fill"
                    className="shrink-0 text-[#C93A2B]/40"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-32 min-[380px]:px-6 md:pb-24 md:pt-48">
        {/* Scrub manifesto */}
        <div className="scrub-block mx-auto max-w-4xl text-center">
          <h2
            id="menu-title"
            className="font-sans text-4xl font-bold tracking-tight md:text-6xl md:leading-[1.05]"
            style={{ textWrap: "balance" }}
          >
            Five pies. Done right.
          </h2>
          <p
            className="mx-auto mt-8 max-w-[58ch] text-xl leading-relaxed md:text-2xl md:font-light"
            aria-label="Our promise: short menu, every pie earns its place"
          >
            {manifesto.map((word, i) => (
              <span key={i} className="scrub-word opacity-[0.15]">
                {word}{" "}
              </span>
            ))}
          </p>
        </div>

        {/* Menu trio */}
        <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {pies.map((pie) => (
            <article
              key={pie.name}
              className="menu-card group overflow-hidden rounded-2xl bg-white ring-1 ring-[#1A1714]/10 transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(26,23,20,0.10)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1A1714]/5 min-[480px]:aspect-[4/5]">
                <div className="menu-zoom absolute inset-0">
                  <Image
                    src={pie.src}
                    alt={pie.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <span className="absolute left-5 top-5 rounded-full bg-[#FFFBF2]/90 px-4 py-1.5 font-mono text-xs font-medium text-[#1A1714] backdrop-blur">
                  {pie.price}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 p-7">
                <div>
                  <h3 className="text-xl font-semibold">{pie.name}</h3>
                  <p className="mt-2 max-w-[30ch] text-[15px] leading-relaxed text-[#1A1714]/60">
                    {pie.note}
                  </p>
                </div>
                <a
                  href="#visit"
                  aria-label={`Order ${pie.name}`}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#1A1714]/15 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:border-[#1A1714] group-hover:bg-[#1A1714] group-hover:text-[#FFFBF2]"
                >
                  <ArrowRight size={18} weight="bold" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
