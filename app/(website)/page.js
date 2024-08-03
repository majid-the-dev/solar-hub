import About from "@/components/About";
import FAQ from "@/components/FAQ";
import GetQoute from "@/components/GetQoute";
import Hero from "@/components/Hero";
import HeroBar from "@/components/HeroBar";
import Products from "@/components/Products";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      {/* <HeroBar /> */}
      <About />
      <Products />
      <FAQ />
      <GetQoute />
    </div>
  );
}
