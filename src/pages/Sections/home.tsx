import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Box, Text } from "../../components";
import { useDeviceType } from "../../hooks/useDeviceType";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceType();

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
      flexDirection={isMobile ? "column" : "row"}
      alignItems={"center"}
      justifyContent={isMobile ? "center" : "space-between"}
      padding={isMobile ? "0 8vw" : "0 10vw"}
    >
      <Box
        className="hero-anim"
        width={isMobile ? "100%" : "45%"}
        style={{ marginTop: isMobile ? "70px" : "15dvh" }}
      >
        <Text
          fontSize={isMobile ? "5.5vw" : "1.5dvw"}
          fontFamily="Instrument Serif"
          color="#FFFFFF"
          textAlign="left"
          lineHeight={isMobile ? "1.2" : "1"}
        >
          Construo sistemas da mesma forma que o desejo constrói identidade
          <br />
          esticando a estrutura até que ela se torne expressão.
          <br />
          Lógica, intensidade e excesso não são contradições.
          <br />
          São arquitetura.
        </Text>
      </Box>

      <Box
        className="hero-anim"
        width={isMobile ? "100%" : "35%"}
        style={{ marginTop: isMobile ? "8vh" : "15dvh" }}
      >
        <Text
          fontSize={isMobile ? "5.5vw" : "1.5dvw"}
          fontFamily="Instrument Serif"
          color="#FFFFFF"
          textAlign="right"
          lineHeight={isMobile ? "1.2" : "1"}
        >
          Pedro Paulo
          <br />
          Cientista da Computação
          <br />
          Desenvolvedor UI/UX, mobile e web
        </Text>
      </Box>

      <Box
        position="absolute"
        bottom={isMobile ? "6vh" : "8vh"}
        width={isMobile ? "100%" : "auto"}
        left={isMobile ? "0" : "50%"}
        style={{ transform: isMobile ? "translateX(0%)" : "translateX(-50%)" }}
      >
        <Box
          className="hero-anim"
          textAlign="center"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={isMobile ? "100%" : "auto"}
        >
          <Text
            fontSize={isMobile ? "4.5vw" : "1.2dvw"}
            fontFamily="Instrument Serif"
            color="#ffffff"
          >
            Projetado por pp, uma mente em distorção
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
