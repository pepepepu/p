import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Box, Text } from "../../components";
import { theme } from "../../styles/Theme/theme";
import { useDeviceType } from "../../hooks/useDeviceType";

gsap.registerPlugin(ScrollTrigger);

const Cornucopeiac = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceType();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        topLeftRef.current,
        { x: -50, opacity: 0, filter: "blur(15px)" },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        },
      )
        .fromTo(
          bottomRightRef.current,
          { x: 50, opacity: 0, filter: "blur(15px)" },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8",
        )
        .fromTo(
          footerRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
          "-=0.6",
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      width="100%"
      height="100dvh"
      position="relative"
      style={{ mixBlendMode: "difference", color: theme.colors.background }}
      overflow="hidden"
    >
      <Box
        ref={topLeftRef}
        position="absolute"
        top={"15vh"}
        left="5vw"
        display="flex"
        flexDirection="column"
        gap={isMobile ? "10px" : "5px"}
      >
        <Text
          fontSize={isMobile ? "10vw" : "2.5dvw"}
          fontFamily="Instrument Serif"
          lineHeight="0.9"
          style={{ textTransform: "uppercase" }}
        >
          Pedro Paulo Oliveira<br></br> Barros Souza
        </Text>
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          gap="0.3rem"
          opacity={0.8}
        >
          <Text
            fontSize={isMobile ? "1.2rem" : "1.5rem"}
            fontFamily="Instrument Serif"
            fontStyle={"italic"}
          >
            FRONT-END ENGINEER {isMobile ? "" : "-"}
          </Text>
          <Text
            fontSize={isMobile ? "1.2rem" : "1.5rem"}
            fontFamily="Instrument Serif"
            fontStyle={"italic"}
          >
            UI/UX DESIGNER {isMobile ? "" : "-"}
          </Text>
          <Text
            fontSize={isMobile ? "1.2rem" : "1.5rem"}
            fontFamily="Instrument Serif"
            fontStyle={"italic"}
          >
            MOBILE DEVELOPER
          </Text>
        </Box>
      </Box>

      <Box
        ref={bottomRightRef}
        position="absolute"
        bottom={isMobile ? "30vh" : "18vh"}
        right="5vw"
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        gap={isMobile ? "0.5rem" : "0.5rem"}
      >
        <Box
          as="a"
          href="https://www.linkedin.com/in/pp-oliveira"
          target="_blank"
          rel="noreferrer"
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Text
            fontSize={isMobile ? "1.2rem" : "1.5rem"}
            fontFamily="Instrument Serif"
            style={{ textTransform: "uppercase" }}
          >
            LINKEDIN
          </Text>
          <svg
            width={isMobile ? "14" : "18"}
            height={isMobile ? "14" : "18"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </Box>

        <Box
          as="a"
          href="https://github.com/pepepepu"
          target="_blank"
          rel="noreferrer"
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Text
            fontSize={isMobile ? "1.2rem" : "1.5rem"}
            fontFamily="Instrument Serif"
            style={{ textTransform: "uppercase" }}
          >
            GITHUB
          </Text>
          <svg
            width={isMobile ? "14" : "18"}
            height={isMobile ? "14" : "18"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </Box>

        <Box
          as="a"
          href="https://www.behance.net/pedropoliveir2"
          target="_blank"
          rel="noreferrer"
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Text
            fontSize={isMobile ? "1.2rem" : "1.5rem"}
            fontFamily="Instrument Serif"
            style={{ textTransform: "uppercase" }}
          >
            BEHANCE
          </Text>
          <svg
            width={isMobile ? "14" : "18"}
            height={isMobile ? "14" : "18"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </Box>
      </Box>

      <Box
        ref={footerRef}
        position="absolute"
        bottom={isMobile ? "2vh" : "4vh"}
        left="5vw"
        width="90vw"
      >
        <Text
          fontSize={isMobile ? "0.6rem" : "0.75rem"}
          fontFamily="Instrument Serif"
          textAlign="justify"
          lineHeight={isMobile ? "1.4" : "1.2"}
          style={{
            textTransform: "uppercase",
            opacity: 0.45,
            wordSpacing: "0.1rem",
          }}
        >
          TECHNICAL STACK AND ARCHITECTURE EXPERTISE: FRONT-END DEVELOPMENT
          POWERED BY REACT.JS, VUE.JS, TYPESCRIPT, JAVASCRIPT (ES6+), HTML5,
          CSS3, SASS, STYLED-COMPONENTS, AND TAILWIND CSS. INTERACTIVE MOTION
          AND IMMERSIVE EXPERIENCES ENGINEERED WITH GSAP, FRAMER MOTION,
          SCROLLTRIGGER, AND WEB ANIMATIONS API. MOBILE APPLICATION DEVELOPMENT
          ARCHITECTED THROUGH REACT NATIVE AND EXPO. BACK-END LOGIC AND DATA
          MANIPULATION DRIVEN BY PYTHON, FASTAPI, NODE.JS, POSTGRESQL, RESTFUL
          APIS, AND SYSTEM INTEGRATION CAPABILITIES. COMPREHENSIVE UI/UX DESIGN
          LIFECYCLE INCLUDING WIREFRAMING, INTERACTION DESIGN, USER CENTRIC
          RESEARCH, AND HIGH-FIDELITY PROTOTYPING USING FIGMA. DEPLOYMENT,
          VERSION CONTROL, AND CONTINUOUS INTEGRATION MANAGED VIA GIT, GITHUB
          ACTIONS AND VERCEL. CORE PRINCIPLES ROOTED IN ATOMIC DESIGN, CLEAN
          ARCHITECTURE, RESPONSIVE METHODOLOGIES, WEB ACCESSIBILITY (A11Y), AND
          RELENTLESS PERFORMANCE OPTIMIZATION FOR THE MODERN WEB PARADIGM.
        </Text>
      </Box>
    </Box>
  );
};

export default Cornucopeiac;
