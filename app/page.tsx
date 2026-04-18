import AmbientStarfield from "@/components/AmbientStarfield";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Process from "@/components/Process";
import Quote from "@/components/Quote";
import RevealObserver from "@/components/RevealObserver";
import Services from "@/components/Services";
import SmoothScroll from "@/components/SmoothScroll";
import Work from "@/components/Work";

export default function HomePage() {
  return (
    <>
      <AmbientStarfield />
      <div className="grain" aria-hidden="true" />

      <Nav />

      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Process />
      <Quote />
      <Contact />
      <Footer />

      <CustomCursor />
      <RevealObserver />
      <SmoothScroll />
    </>
  );
}
