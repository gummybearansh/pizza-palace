import { Flame, ArrowRight, MapPin, Clock } from "@phosphor-icons/react/dist/ssr";
import { TrackedAnchor } from "./TrackedAnchor";

export default function Footer() {
  return (
    <footer
      id="visit"
      aria-labelledby="visit-title"
      className="relative w-full overflow-hidden bg-[#1A1714] text-[#FFFBF2]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: "url(/glow.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1714]/60 via-[#1A1714]/20 to-[#1A1714]/75" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-20 min-[380px]:px-6 md:pb-12 md:pt-28">
        <div className="max-w-4xl">
          <h2
            id="visit-title"
            className="font-sans text-4xl font-bold tracking-tight min-[380px]:text-5xl md:text-7xl md:leading-[1.02]"
            style={{ textWrap: "balance" }}
          >
            Hungry? Pickup in 15 minutes.
          </h2>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-white/65">
            Call ahead or order at the counter. Your pie leaves the oven as
            you walk in.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrackedAnchor
              href="tel:+14155550134"
              event="phone_click"
              eventProps={{ location: "footer" }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#C93A2B] py-2 pl-8 pr-2 text-base font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#b23326] active:scale-[0.98]"
            >
              <span className="py-2.5">Order Pickup</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-white/35">
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </span>
            </TrackedAnchor>
            <a
              href="#top"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-base font-medium text-[#FFFBF2] transition-all duration-500 hover:border-white/40 hover:bg-white/5 active:scale-[0.98]"
            >
              Back to Top
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-white/10 pt-12 sm:grid-cols-3">
          <div>
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
              <MapPin size={14} weight="regular" aria-hidden="true" />
              Visit
            </p>
            <p className="mt-4 leading-relaxed text-white/80">
              444 Grove Street
              <br />
              Hayes Valley, SF
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
              <Clock size={14} weight="regular" aria-hidden="true" />
              Hours
            </p>
            <p className="mt-4 leading-relaxed text-white/80">
              Tue to Sun · 12pm to 10pm
              <br />
              Closed Mondays
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
              <Flame size={14} weight="fill" aria-hidden="true" />
              Order
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {["Pickup counter", "Phone orders", "Catering trays"].map((x) => (
                <TrackedAnchor
                  key={x}
                  href="tel:+14155550134"
                  event="phone_click"
                  eventProps={{ location: "footer_list" }}
                  className="w-fit leading-relaxed text-white/80 transition-colors hover:text-white"
                >
                  {x}
                </TrackedAnchor>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 font-mono text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Pizza Palace. All rights reserved.</span>
          <span>Wood-fired in Hayes Valley.</span>
        </div>
      </div>
    </footer>
  );
}
