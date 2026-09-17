"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Clock } from "@phosphor-icons/react";
import Navigation from "./Navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-h1", { y: 36, opacity: 0, duration: 1 }, 0.1)
          .from(".hero-sub", { y: 24, opacity: 0, duration: 0.9 }, 0.28)
          .from(".hero-cta", { y: 20, opacity: 0, duration: 0.8 }, 0.42)
          .from(
            ".hero-media",
            { y: 32, opacity: 0, scale: 0.96, duration: 1.1 },
            0.25
          )
          .from(".hero-meta", { opacity: 0, duration: 0.8 }, 0.6);

        // Nav belongs to hero only: fade it as hero scrolls away
        gsap.to(".nav-fade", {
          opacity: 0,
          y: -12,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "55% top",
            scrub: true,
          },
        });

        // Gentle parallax on the image, scrubbed
        gsap.to(".hero-media-inner", {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }, root);
      return () => ctx.revert();
    },
    { scope: root }
  );

  return (
    <section
      id="top"
      ref={root}
      aria-labelledby="hero-title"
      className="relative w-full overflow-hidden bg-[#FFFBF2]"
    >
      <Navigation />

      {/* Full-bleed background video with paper scrims for readability */}
      <div aria-hidden="true" className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#FFFBF2]/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBF2]/55 via-[#FFFBF2]/15 to-[#FFFBF2]/90" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-20 pt-24 min-[380px]:px-6 md:pb-24 md:pt-28 lg:grid-cols-12 lg:gap-10">
        {/* Text — 7 cols, ultra-wide H1 for 2-line flow */}
        <div className="lg:col-span-7">
          <h1
            id="hero-title"
            className="hero-h1 w-full max-w-5xl font-sans font-bold tracking-[-0.02em] text-[#1A1714]"
            style={{
              fontSize: "clamp(2.75rem, 4.5vw, 4.75rem)",
              lineHeight: "1.04",
              textWrap: "balance",
            }}
          >
            Slow{" "}
            <span
              className="mx-1 inline-block h-[0.72em] w-[1.9em] rounded-full bg-cover bg-center align-baseline"
              style={{
                backgroundImage: "url(/crust.png)",
              }}
              role="img"
              aria-label="Close-up of leopard-spotted pizza crust"
            />{" "}
            dough.
            <br />
            Fierce fire.
          </h1>

          <p className="hero-sub mt-5 max-w-[42ch] text-lg leading-relaxed text-[#1A1714]/65 md:text-xl md:font-light">
            48-hour dough, San Marzano tomato, wood fire at 450C. Pickup in
            15 minutes.
          </p>

          <div className="hero-cta mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#visit"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1A1714] py-2 pl-8 pr-2 text-base font-medium text-[#FFFBF2] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
            >
              <span className="py-2.5">Order Pickup</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-white/30">
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </span>
            </a>
            <a
              href="#menu"
              className="inline-flex items-center justify-center rounded-full border border-[#1A1714]/15 bg-transparent px-8 py-4 text-base font-medium text-[#1A1714] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-[#C93A2B]/50 hover:text-[#C93A2B] active:scale-[0.98]"
            >
              View Menu
            </a>
          </div>

          <p className="hero-meta mt-6 flex items-center gap-2 font-mono text-xs tracking-wide text-[#1A1714]/50">
            <Clock size={14} weight="regular" aria-hidden="true" />
            Tue to Sun · 12pm to 10pm · Hayes Valley
          </p>
        </div>

        {/* Image — 5 cols, massive negative space around it */}
        <div className="lg:col-span-5">
          <div className="hero-media rounded-[2rem] bg-white/50 p-2 ring-1 ring-[#1A1714]/10">
            <div className="hero-media-inner relative aspect-[16/10] overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[#1A1714]/5 min-[480px]:aspect-[4/5]">
              <Image
                src="/hero.png"
                alt="Wood-fired margherita pizza on a white oak counter"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-6 pt-16">
                <p className="text-sm font-medium text-white">
                  Margherita · 90 seconds at 450C
                </p>
                <p className="mt-1 font-mono text-xs text-white/70">
                  No gas. No electric. Oak only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
