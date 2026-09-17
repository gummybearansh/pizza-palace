"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flame, CookingPot, Leaf } from "@phosphor-icons/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CraftBento() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Entry stagger
        gsap.utils.toArray<HTMLElement>(".bento-card").forEach((card, i) => {
          gsap.from(card, {
            y: 36,
            opacity: 0,
            duration: 0.9,
            delay: (i % 4) * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          });
        });

        // Image scale 0.85 -> 1 scrubbed per card
        gsap.utils.toArray<HTMLElement>(".bento-zoom").forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 0.85 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                start: "top 95%",
                end: "top 45%",
                scrub: 1,
              },
            }
          );
        });
      }, root);
      return () => ctx.revert();
    },
    { scope: root }
  );

  return (
    <section
      id="craft"
      ref={root}
      aria-labelledby="craft-title"
      className="relative w-full bg-[#FFFBF2] py-32 md:py-48"
    >
      <div className="mx-auto w-full max-w-7xl px-4 min-[380px]:px-6">
        <div className="max-w-3xl">
          <h2
            id="craft-title"
            className="font-sans text-4xl font-bold tracking-tight text-[#1A1714] md:text-6xl md:leading-[1.05]"
            style={{ textWrap: "balance" }}
          >
            Craft you can{" "}
            <span
              className="mx-1 inline-block h-[0.72em] w-[1.8em] rounded-full bg-cover bg-center align-baseline"
              style={{
                backgroundImage: "url(/oven.png)",
              }}
              role="img"
              aria-label="Flames inside the wood oven"
            />{" "}
            taste in the crust.
          </h2>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-[#1A1714]/65">
            Three things, done properly every day. Long fermentation, honest
            tomatoes, and a live oak fire.
          </p>
        </div>

        {/* Gapless dense bento: 4+2 / 4+2 / 6 = 18 units, zero voids */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-6 md:grid-flow-dense">
          {/* A — large oven proof, 4 cols x 2 rows */}
          <article className="bento-card group relative min-h-[420px] overflow-hidden rounded-2xl bg-[#1A1714] ring-1 ring-[#1A1714]/10 md:col-span-4 md:row-span-2">
            <div className="bento-zoom absolute inset-0">
              <Image
                src="/oven.png"
                alt="Pizzaiolo sliding a margherita into a wood-fired oven"
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                loading="lazy"
                className="object-cover opacity-95 transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute bottom-0 p-8">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
                <Flame size={14} weight="fill" aria-hidden="true" />
                Oak fire · 450C
              </p>
              <h3 className="mt-3 max-w-[22ch] text-2xl font-semibold text-white md:text-3xl">
                Ninety seconds in live fire. Nothing else cooks it.
              </h3>
            </div>
          </article>

          {/* B — dough, 2 cols */}
          <article className="bento-card group flex min-h-[200px] flex-col justify-between rounded-2xl bg-white p-8 ring-1 ring-[#1A1714]/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#fffdf8] md:col-span-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2F5D3A]/10 text-[#2F5D3A]">
              <CookingPot size={20} weight="regular" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-xl font-semibold">48-hour dough</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#1A1714]/60">
                Caputo 00, sea salt, water. Rested two days for chew and char.
              </p>
            </div>
          </article>

          {/* C — macro crust, 2 cols */}
          <article className="bento-card group relative min-h-[200px] overflow-hidden rounded-2xl ring-1 ring-[#1A1714]/10 md:col-span-2">
            <div className="bento-zoom absolute inset-0">
              <Image
                src="/crust.png"
                alt="Leopard-spotted pizza crust close-up"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <p className="absolute bottom-0 p-6 text-sm font-medium text-white">
              Leopard spots mean the fire was right.
            </p>
          </article>

          {/* D — full-width strip, 6 cols */}
          <article className="bento-card flex flex-col gap-6 rounded-2xl bg-[#1A1714] p-8 text-[#FFFBF2] md:col-span-6 md:flex-row md:items-center md:justify-between md:px-10">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Leaf size={20} weight="regular" aria-hidden="true" />
              </span>
              <p className="max-w-[52ch] text-lg font-light leading-relaxed">
                San Marzano DOP, fior di latte pulled daily, basil cut to
                order.{" "}
                <span className="font-medium">Five pizzas. No filler.</span>
              </p>
            </div>
            <div className="flex shrink-0 gap-8 font-mono text-xs uppercase tracking-[0.18em] text-white/60">
              <span>5 pies</span>
              <span>Oak only</span>
              <span>15 min</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
