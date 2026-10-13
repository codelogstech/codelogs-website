import ClientWork from "@/components/ClientWork";
import Contact from "@/components/Contact";
import EdgePanels from "@/components/EdgePanels";
import GlobalReach from "@/components/GlobalReach";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Process from "@/components/Process";
import Quote from "@/components/Quote";
import Services from "@/components/Services";
import SiliconBeach from "@/components/SiliconBeach";
import Technologies from "@/components/Technologies";
import Work from "@/components/Work";
import Engagement from "@/components/home/Engagement";
import FindPath from "@/components/home/FindPath";
import ClientWall from "@/components/home/ClientWall";
import LandingFilm from "@/components/home/LandingFilm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LandingFilm />
      <Marquee />
      <ClientWall />
      <Services />
      <FindPath />
      <Work />
      <ClientWork />
      <Process />
      <Engagement />
      <EdgePanels />
      <Technologies />
      <Quote />
      <GlobalReach />
      <SiliconBeach />
      <Contact />
    </>
  );
}
