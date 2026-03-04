import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { Box, Header, LavaBackground } from "../../components";
import Cornucopeiac from "../Sections/cornucopeiac";
import Hero from "../Sections/home";
import Manic from "../Sections/manic";
import Twisted from "../Sections/twisted";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const twistedRef = useRef<HTMLDivElement>(null);
  const manicRef = useRef<HTMLDivElement>(null);
  const cornRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    ScrollTrigger.clearScrollMemory("manual");
    window.scrollTo(0, 0);

    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" },
    );

    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Box ref={containerRef} width="100%" position="relative" overflow="clip">
      <LavaBackground />
      <Header
        sectionRefs={{
          hero: heroRef,
          twisted: twistedRef,
          manic: manicRef,
          cornucopeiac: cornRef,
        }}
      />

      <Box
        position="relative"
        zIndex={1}
        display="flex"
        flexDirection="column"
        width="100%"
        style={{ mixBlendMode: "difference", color: "#FFFFFF" }}
      >
        <div ref={heroRef}>
          <Hero />
        </div>
        <div ref={twistedRef}>
          <Twisted />
        </div>
        <div ref={manicRef}>
          <Manic />
        </div>
        <div ref={cornRef}>
          <Cornucopeiac />
        </div>
      </Box>
    </Box>
  );
};

export default Home;
