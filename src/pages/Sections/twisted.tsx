import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Box, Text } from "../../components";
import { theme } from "../../styles/Theme/theme";
import { useDeviceType } from "../../hooks/useDeviceType";

gsap.registerPlugin(ScrollTrigger);

const Twisted = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const ufsLineRef = useRef<SVGPathElement>(null);
  const expLineRef = useRef<SVGPathElement>(null);
  const skillsLineRef = useRef<SVGPathElement>(null);
  const { isMobile } = useDeviceType();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(textContainerRef.current, {
        opacity: 0,
        y: 100,
        filter: "blur(15px)",
        scale: 0.95,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      tl.to(textContainerRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        duration: 2,
        ease: "power2.out",
      })
        .to(
          ufsLineRef.current,
          { strokeDashoffset: 0, duration: 1.5, ease: "none" },
          "-=0.5",
        )
        .to(
          expLineRef.current,
          { strokeDashoffset: 0, duration: 1.5, ease: "none" },
          "-=1",
        )
        .to(
          skillsLineRef.current,
          { strokeDashoffset: 0, duration: 1.5, ease: "none" },
          "-=1",
        )
        .to({}, { duration: 1.5 })
        .to(textContainerRef.current, {
          opacity: 0,
          y: -100,
          filter: "blur(15px)",
          scale: 1.05,
          duration: 2,
          ease: "power2.in",
        });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      width="100%"
      height="100dvh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={isMobile ? "0 8vw" : "0 5vw"}
      style={{ mixBlendMode: "difference", color: theme.colors.background }}
    >
      <Box ref={textContainerRef} width={isMobile ? "100%" : "90vw"}>
        <Text
          fontSize={isMobile ? "8vw" : "4.2dvw"}
          fontFamily="Instrument Serif"
          textAlign={"justify"}
          lineHeight={isMobile ? "1.3" : "1.1"}
          style={{ textTransform: "uppercase" }}
        >
          Distilling chaos into pure intent. Grounded in the academic depths of{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            UFS
            <svg
              style={{
                position: "absolute",
                bottom: "-10%",
                left: "-5%",
                width: "110%",
                height: "30%",
                pointerEvents: "none",
                overflow: "visible",
              }}
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
            >
              <path
                ref={ufsLineRef}
                d="M 0 15 Q 30 5 100 10"
                fill="none"
                stroke={theme.colors.background}
                strokeWidth={isMobile ? "3" : "4"}
                pathLength="100"
                style={{ strokeDasharray: 105, strokeDashoffset: 105 }}
              />
            </svg>
          </span>
          , my vision has been sharpened by{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            4 years
            <svg
              style={{
                position: "absolute",
                bottom: "-10%",
                left: "-5%",
                width: "110%",
                height: "30%",
                pointerEvents: "none",
                overflow: "visible",
              }}
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
            >
              <path
                ref={expLineRef}
                d="M 5 10 Q 50 18 95 8"
                fill="none"
                stroke={theme.colors.background}
                strokeWidth={isMobile ? "3" : "4"}
                pathLength="100"
                style={{ strokeDasharray: 105, strokeDashoffset: 105 }}
              />
            </svg>
          </span>{" "}
          of visceral, unyielding design. I bend the digital fabric through{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            React, Vue, TypeScript, and UI/UX
            <svg
              style={{
                position: "absolute",
                bottom: "-10%",
                left: "-2%",
                width: "104%",
                height: "40%",
                pointerEvents: "none",
                overflow: "visible",
              }}
              viewBox="0 0 100 30"
              preserveAspectRatio="none"
            >
              <path
                ref={skillsLineRef}
                d="M 2 25 Q 25 5 50 20 T 98 15"
                fill="none"
                stroke={theme.colors.background}
                strokeWidth={isMobile ? "2" : "3"}
                pathLength="100"
                style={{ strokeDasharray: 105, strokeDashoffset: 105 }}
              />
            </svg>
          </span>
          , transforming fragmented thoughts into brutal, undeniable realities.
        </Text>
      </Box>
    </Box>
  );
};

export default Twisted;
