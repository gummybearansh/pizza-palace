import Hero from "@/components/Hero";
import CraftBento from "@/components/CraftBento";
import MenuDesire from "@/components/MenuDesire";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full max-w-full flex-1 overflow-x-hidden bg-[#FFFBF2] text-[#1A1714]">
      <div className="palace-grain" aria-hidden="true" />
      <Hero />
      <CraftBento />
      <MenuDesire />
      <Footer />
    </main>
  );
}
