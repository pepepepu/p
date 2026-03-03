import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Box, Text } from "../../components";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".hero-anim");

      gsap.fromTo(
        elements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "power4.out",
          delay: 1.2,
        },
      );

      gsap.to(elements, {
        y: -50,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom 50%",
          scrub: 1,
        },
        immediateRender: false,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={heroRef}
      width="100%"
      height="100dvh"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="0 10vw"
    >
      <Box className="hero-anim" width="35%" style={{ marginTop: "15dvh" }}>
        <Text fontSize="1.5dvw" fontFamily="Instrument Serif" color={"#FFFFFF"}>
          I build systems the way desire builds identity
          <br />
          stretching structure until it becomes expression.
          <br />
          Logic, intensity, and excess are not contradictions.
          <br />
          They are architecture.
        </Text>
      </Box>

      <Box className="hero-anim" width="35%" style={{ marginTop: "15dvh" }}>
        <Text
          fontSize="1.5dvw"
          fontFamily="Instrument Serif"
          color={"#FFFFFF"}
          textAlign="right"
        >
          Pedro Paulo
          <br />
          22y
          <br />
          Computer Scientist
          <br />
          UI/UX, mobile e web
        </Text>
      </Box>

      <Box
        position="absolute"
        bottom="8vh"
        left="50%"
        style={{ transform: "translateX(-50%)" }}
      >
        <Box className="hero-anim" textAlign="center">
          <Text fontSize="1.2dvw" fontFamily="Instrument Serif" color="#ffffff">
            engineered by pepe, a mind in distortion
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
