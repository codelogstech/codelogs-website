import Contact from "@/components/Contact";
import EdgePanels from "@/components/EdgePanels";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Process from "@/components/Process";
import Quote from "@/components/Quote";
import Services from "@/components/Services";
import SiliconBeach from "@/components/SiliconBeach";
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
      <EdgePanels />
      <Technologies />
      <Quote />
      <SiliconBeach />
      <Contact />
    </>
  );
}
