import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Box, Text } from "../../atoms";
import { theme } from "../../../styles/Theme/theme";
import { useDeviceType } from "../../../hooks/useDeviceType";

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
  sectionRefs: {
    hero: React.RefObject<HTMLDivElement | null>;
    twisted: React.RefObject<HTMLDivElement | null>;
    manic: React.RefObject<HTMLDivElement | null>;
    cornucopeiac: React.RefObject<HTMLDivElement | null>;
  };
}

const Header = ({ sectionRefs }: HeaderProps) => {
  const phraseRef = useRef<HTMLDivElement>(null);
  const twistedWordRef = useRef<HTMLDivElement>(null);
  const manicWordRef = useRef<HTMLDivElement>(null);
  const cornWordRef = useRef<HTMLDivElement>(null);
  const twistedScribble = useRef<SVGPathElement>(null);
  const manicScribble = useRef<SVGPathElement>(null);
  const cornScribble = useRef<SVGPathElement>(null);
  const { isMobile } = useDeviceType();

  const phrase =
    "desejo se estendendo além do corpo, remodelando tudo o que ousa tocar, dissolvendo os limites da forma.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".header-word",
        { y: 80, opacity: 0, rotation: 4, filter: "blur(12px)" },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          filter: "blur(0px)",
          duration: 1.4,
          stagger: 0.1,
          ease: "power4.out",
        },
      );

      gsap.fromTo(
        ".phrase-word",
        { y: 30, opacity: 0, filter: "blur(5px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.03,
          ease: "power3.out",
          delay: 0.5,
        },
      );

      if (
        !sectionRefs.twisted.current ||
        !sectionRefs.manic.current ||
        !sectionRefs.cornucopeiac.current
      ) {
        return;
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRefs.twisted.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            invalidateOnRefresh: true,
            refreshPriority: -1,
          },
        })
        .to(
          [manicWordRef.current, cornWordRef.current, phraseRef.current],
          { opacity: 0, duration: 1, ease: "power2.inOut" },
          0,
        )
        .to(
          twistedScribble.current,
          { strokeDashoffset: 0, duration: 1.5, ease: "none" },
          0,
        );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRefs.manic.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            invalidateOnRefresh: true,
            refreshPriority: -1,
          },
        })
        .to(
          twistedScribble.current,
          { strokeDashoffset: 105, duration: 1, ease: "none" },
          0,
        )
        .to(
          twistedWordRef.current,
          { opacity: 0, duration: 1, ease: "power2.inOut" },
          0,
        )
        .to(
          manicWordRef.current,
          { opacity: 1, top: 0, duration: 1, ease: "power2.inOut" },
          0,
        )
        .to(
          manicScribble.current,
          { strokeDashoffset: 0, duration: 1.5, ease: "none" },
          0,
        );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRefs.cornucopeiac.current,
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
            invalidateOnRefresh: true,
            refreshPriority: -1,
          },
        })
        .to(
          manicScribble.current,
          { strokeDashoffset: 105, duration: 1, ease: "none" },
          0,
        )
        .to(
          manicWordRef.current,
          { opacity: 0, duration: 1, ease: "power2.inOut" },
          0,
        )
        .to(
          cornWordRef.current,
          { opacity: 1, top: 0, duration: 1, ease: "power2.inOut" },
          0,
        )
        .to(
          cornScribble.current,
          { strokeDashoffset: 0, duration: 1.5, ease: "none" },
          0,
        );
    });

    return () => ctx.revert();
  }, [sectionRefs, isMobile]);

  return (
    <Box
      position="fixed"
      top={isMobile ? "15px" : "0"}
      left={"0"}
      width="100%"
      height="100dvh"
      zIndex={1}
      color={theme.colors.background}
      display="flex"
      flexDirection="column"
      alignItems={isMobile ? "flex-start" : "center"}
      justifyContent="flex-start"
      padding="0 30px"
      style={{ mixBlendMode: "difference", pointerEvents: "none" }}
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent={isMobile ? "flex-start" : "space-between"}
        style={
          isMobile
            ? { position: "relative", height: "45vw", marginTop: "10px" }
            : { position: "relative" }
        }
      >
        <div
          ref={twistedWordRef}
          className="header-word"
          style={{
            position: isMobile ? "absolute" : "relative",
            top: 0,
            left: 0,
          }}
        >
          <Text
            fontSize={isMobile ? "15vw" : "7dvw"}
            fontFamily="Instrument Serif"
            whiteSpace="nowrap"
            lineHeight="0.9"
          >
            twisted
          </Text>
          <svg
            style={{
              position: "absolute",
              top: "0%",
              left: "0%",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              overflow: "visible",
            }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              ref={twistedScribble}
              d="M -10 20 L 115 15 L -5 35 L 110 40 L -15 50 L 120 60 L -10 70 L 115 80 L -5 90 L 120 95"
              fill="none"
              stroke="currentColor"
              strokeWidth={isMobile ? "4" : "2"}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="100"
              style={{ strokeDasharray: 105, strokeDashoffset: 105 }}
            />
          </svg>
        </div>

        <div
          ref={manicWordRef}
          className="header-word"
          style={{
            position: isMobile ? "absolute" : "relative",
            top: isMobile ? "14vw" : "auto",
            left: 0,
          }}
        >
          <Text
            fontSize={isMobile ? "15vw" : "7dvw"}
            fontFamily="Instrument Serif"
            whiteSpace="nowrap"
            lineHeight="0.9"
          >
            manic
          </Text>
          <svg
            style={{
              position: "absolute",
              top: "0%",
              left: "0%",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              overflow: "visible",
            }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              ref={manicScribble}
              d="M -15 25 L 110 20 L -5 40 L 120 35 L -10 55 L 115 65 L -20 75 L 110 85 L -5 95 L 115 100"
              fill="none"
              stroke="currentColor"
              strokeWidth={isMobile ? "4" : "2"}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="100"
              style={{ strokeDasharray: 105, strokeDashoffset: 105 }}
            />
          </svg>
        </div>

        <div
          ref={cornWordRef}
          className="header-word"
          style={{
            position: isMobile ? "absolute" : "relative",
            top: isMobile ? "28vw" : "auto",
            left: 0,
          }}
        >
          <Text
            fontSize={isMobile ? "15vw" : "7dvw"}
            fontFamily="Instrument Serif"
            whiteSpace="nowrap"
            lineHeight="0.9"
          >
            cornucopeiac
          </Text>
          <svg
            style={{
              position: "absolute",
              top: "0%",
              left: "0%",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              overflow: "visible",
            }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              ref={cornScribble}
              d="M -10 15 L 120 25 L -15 35 L 110 45 L -5 60 L 115 55 L -10 75 L 120 70 L -5 85 L 110 95"
              fill="none"
              stroke="currentColor"
              strokeWidth={isMobile ? "4" : "2"}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="100"
              style={{ strokeDasharray: 105, strokeDashoffset: 105 }}
            />
          </svg>
        </div>
      </Box>

      {!isMobile && (
        <Box
          ref={phraseRef}
          width="100%"
          display="flex"
          flexDirection="row"
          flexWrap={"nowrap"}
          justifyContent={"space-between"}
          margin={"15px 0 0 0"}
        >
          {phrase.split(" ").map((word, index) => (
            <div key={index} className="phrase-word">
              <Text fontSize={"1.5dvw"} fontFamily="Instrument Serif">
                {word}
              </Text>
            </div>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Header;
