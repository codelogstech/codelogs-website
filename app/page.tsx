import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Process from "@/components/Process";
import Quote from "@/components/Quote";
import Services from "@/components/Services";
import Technologies from "@/components/Technologies";
import Work from "@/components/Work";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Process />
      <Technologies />
      <Quote />
      <Contact />
    </>
  );
}
