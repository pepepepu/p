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

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    ScrollTrigger.clearScrollMemory("manual");
    window.scrollTo(0, 0);

    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Box ref={containerRef} width="100dvw" position="relative" overflow="clip">
      <LavaBackground />
      <Header scrollContainer={containerRef} />

      <Box
        position="relative"
        zIndex={1}
        display="flex"
        flexDirection="column"
        width="100%"
        style={{ mixBlendMode: "difference", color: "#FFFFFF" }}
      >
        <Hero />
        <Twisted />
        <Manic />
        <Cornucopeiac />
      </Box>
    </Box>
  );
};

export default Home;
